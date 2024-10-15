pipeline {
    agent {
        docker { image 'mcr.microsoft.com/playwright:v1.47.2-jammy' }  
    }
    environment {
        // Thông tin repository GitHub
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
        stage('Preparation') {
            steps {
                script {
                    echo "Preparing environment..."
                    // Checkout Code
                    withCredentials([usernamePassword(credentialsId: "${JENKINS_CREDENTIALS_ID}", usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                        git branch: "${BRANCH_NAME}", 
                            credentialsId: "${JENKINS_CREDENTIALS_ID}", 
                            url: "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/DuyThanhLieu/Tongram-Web-3-App-Store-for-TON-BlockChain"
                    }
                    echo "Code checked out from ${BRANCH_NAME}"
                    echo "Current working directory:"
                    sh 'pwd'
                }
            }
        }

        stage('Verify Installation and Setup Dependencies') {
            steps {
                script {
                    dir("${env.WORKSPACE}") {
                        def installations = ['node', 'npm', 'npx']
                        def allInstalled = true

                        for (def tool : installations) {
                            def toolPath = sh(script: "which ${tool} || echo 'Not_Installed'", returnStdout: true).trim()
                            if (toolPath == 'Not_Installed') {
                                allInstalled = false
                                echo "${tool} is not installed. Installing dependencies..."
                            } else {
                                echo "${tool} is installed at ${toolPath}."
                            }
                        }

                        if (!allInstalled) {
                            sh """
                                rm -rf node_modules package-lock.json
                                npm install
                                npx playwright install  
                                npm install @playwright/test@latest
                            """
                        } else {
                            echo "Node, npm, and Playwright are already installed. Skipping setup."
                        }
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
                            ls -la  # Liệt kê các tệp để đảm bảo BS_Auto.sh có ở đó
                            chmod +x ${FILE_SH} 
                            ./${FILE_SH}
                        """
                    } else {
                        bat """
                            dir  # Liệt kê các tệp để đảm bảo BS_Auto.bat có ở đó
                            ${FILE_BAT}
                        """
                    }
                }
                echo "Tests executed"
            }
        }

        stage('Archive Test Results') {
            steps {
                archiveArtifacts artifacts: '**/playwright-report/**/*', allowEmptyArchive: true
                echo 'Test results archived.'
            }
        }

        stage('Notify') {
            steps {
                script {
                    def status = currentBuild.result ?: 'SUCCESS'
                    def message = (status == 'SUCCESS') ? "✅ Jenkins Build #${env.BUILD_NUMBER} Success!" : "❌ Jenkins Build #${env.BUILD_NUMBER} Failed!"
                    message += "\n🕒 Time: ${currentBuild.durationString}\n🔗 Link: ${env.BUILD_URL}"
                    sh "curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text='${message}'"
                }
            }
        }

        stage('Clear Resources') {
            steps {
                script {
                    echo 'Cleaning up resources...'
                    sh """
                        rm -rf node_modules package-lock.json
                        echo 'Resources cleaned.'
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                // Chạy giai đoạn dọn dẹp để đảm bảo tài nguyên luôn được xóa
                echo 'Running cleanup...'
                sh """
                    rm -rf node_modules package-lock.json
                    echo 'Cleanup completed.'
                """
            }
        }
    }
}
