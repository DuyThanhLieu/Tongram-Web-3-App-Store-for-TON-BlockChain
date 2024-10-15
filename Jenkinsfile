pipeline {
    agent {
        docker { image 'mcr.microsoft.com/playwright:v1.47.2-jammy' }  
    }
    environment {
        GITHUB_URL = 'https://github.com/DuyThanhLieu/Tongram-Web-3-App-Store-for-TON-BlockChain'
        REPO_NAME = 'Tongram-Web-3-App-Store-for-TON-BlockChain'
        BRANCH_NAME = 'main'
        JENKINS_USERNAME = 'DuyThanhLieu'
        JENKINS_ADDRESS = 'jenkins.playgroundvina.com'
        FILE_SH = 'BS_Auto.sh'
        FILE_BAT = 'BS_Auto.bat'
        JENKINS_CREDENTIALS_ID = '5c7bd325-a531-4236-8534-102e45de69e7'
        CHAT_ID = '-1002308985537'
        BOT_TOKEN = '8085219018:AAHSTNao6k9OucZc15LQ476N-039N8NR7WI'
    }

    triggers {
        cron('0 0 * * *') 
    }

    stages {
        stage('CI: Checkout Code') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${JENKINS_CREDENTIALS_ID}", usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                        git branch: "${BRANCH_NAME}", 
                            credentialsId: "${JENKINS_CREDENTIALS_ID}", 
                            url: "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/DuyThanhLieu/Tongram-Web-3-App-Store-for-TON-BlockChain"
                    }
                }
                echo "Code checked out from ${BRANCH_NAME}"
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Verify Installation and Setup Dependencies') {
            steps {
                script {
                    def nodeVersion = sh(script: "node -v || echo 'Not_Installed'", returnStdout: true).trim()
                    def npmVersion = sh(script: "npm -v || echo 'Not_Installed'", returnStdout: true).trim()
                    def playwrightVersion = sh(script: "npx playwright --version || echo 'Not_Installed'", returnStdout: true).trim()

                    if (nodeVersion != 'Not_Installed' && npmVersion != 'Not_Installed' && playwrightVersion != 'Not_Installed') {
                        echo "Node, npm, and Playwright are already installed. Skipping setup."
                    } else {
                        echo "Installing dependencies..."
                        sh """
                            npm install
                            npx playwright install  
                            npm install @playwright/test@latest
                        """
                    }
                }
            }
        }

        stage('CD: Run Tests') {
            steps {
                echo 'Starting Tests'
                script {
                    if (isUnix()) {
                        sh """
                            chmod +x ${FILE_SH}
                            ./${FILE_SH} > test_results.log
                        """
                    } else {
                        bat """
                            ${FILE_BAT} > test_results.log
                        """
                    }

                    // Kiểm tra xem file log có tồn tại hay không
                    def logExists = sh(script: "test -f test_results.log && echo 'exists' || echo 'not_exists'", returnStdout: true).trim()

                    if (logExists == 'exists') {
                        // Parse test_results.log để lấy tổng số, passed, và failed test cases
                        def totalTestCases = sh(script: "grep 'Test Cases:' test_results.log | awk '{print \$3}'", returnStdout: true).trim()
                        def passedTestCases = sh(script: "grep 'Passed:' test_results.log | awk '{print \$2}'", returnStdout: true).trim()
                        def failedTestCases = sh(script: "grep 'Failed:' test_results.log | awk '{print \$2}'", returnStdout: true).trim()

                        totalTestCases = totalTestCases ?: '0'
                        passedTestCases = passedTestCases ?: '0'
                        failedTestCases = failedTestCases ?: '0'

                        // Nếu có test case failed, đọc tên các test case failed
                        def failedTestCasesNames = []
                        if (failedTestCases.toInteger() > 0) {
                            failedTestCasesNames = sh(script: "grep 'FAILED' test_results.log | awk '{print \$2}'", returnStdout: true).split('\n')
                        }

                        echo "Total: ${totalTestCases}, Passed: ${passedTestCases}, Failed: ${failedTestCases}"

                        // Gửi thông báo qua Telegram
                        def message = "🔧 Jenkins Build #${env.BUILD_NUMBER}\n" +
                                      "✅ Status: ${currentBuild.result ?: 'SUCCESS'}\n" +
                                      "Tổng số testcase: ${totalTestCases}\n" +
                                      "Testcase pass: ${passedTestCases}\n" +
                                      "Testcase fail: ${failedTestCases}\n" +
                                      "🕒 Time: ${currentBuild.durationString}\n" +
                                      "🔗 Link: ${env.BUILD_URL}"

                        if (failedTestCases.toInteger() > 0) {
                            message += "\n❌ Failed Test Cases:\n" + failedTestCasesNames.join('\n')
                        }

                        sh "curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text='${message}'"
                    } else {
                        echo "Test log not found!"
                    }
                }
            }
        }

        stage('Archive Test Results') {
            steps {
                archiveArtifacts artifacts: '**/playwright-report/**/*', allowEmptyArchive: true
                echo 'Test results archived.'
            }
        }

        stage('Clear Resources') {
            steps {
                script {
                    echo 'Cleaning up resources...'
                    sh """
                        rm -rf node_modules package-lock.json
                    """
                }
            }
        }
    }

    post {
        success {
            script {
                echo "Build success"
                def message = "✅ Jenkins Build #${env.BUILD_NUMBER} Success!\n" +
                              "🕒 Time: ${currentBuild.durationString}\n" +
                              "🔗 Link: ${env.BUILD_URL}"
                sh "curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text='${message}'"
            }
        }

        failure {
            script {
                echo "Build failed"
                def message = "❌ Jenkins Build #${env.BUILD_NUMBER} Failed!\n" +
                              "🕒 Time: ${currentBuild.durationString}\n" +
                              "🔗 Link: ${env.BUILD_URL}"
                sh "curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text='${message}'"
            }
        }
    }
}
