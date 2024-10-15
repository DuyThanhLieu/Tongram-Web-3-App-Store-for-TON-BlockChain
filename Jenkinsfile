pipeline {
    agent {
        docker { image 'mcr.microsoft.com/playwright:v1.47.2-jammy' }  
    }
    environment {
        // Thông tin repository GitHub
        GITHUB_URL = 'https://github.com/DuyThanhLieu/Tongram-Web-3-App-Store-for-TON-BlockChain'
        SERVER_PATH = 'Tongram-Web-3-App-Store-for-TON-BlockChain' // Cập nhật đường dẫn
        REPO_NAME = 'Tongram-Web-3-App-Store-for-TON-BlockChain'
        BRANCH_NAME = 'main'
        JENKINS_USERNAME = 'DuyThanhLieu'
        JENKINS_ADDRESS = 'jenkins.playgroundvina.com'
        FILE_SH = 'BS_Auto.sh'
        FILE_BAT = 'BS_Auto.bat'
        // Lệnh thực hiện trên server từ xa
        COMMANDS = './BS_Auto.bat'
        JENKINS_CREDENTIALS_ID = '5c7bd325-a531-4236-8534-102e45de69e7'
    }
    // Thông tin bot Telegram
    CHAT_ID = '-1002308985537'  // Chat ID của nhóm
    BOT_TOKEN = '8085219018:AAHSTNao6k9OucZc15LQ476N-039N8NR7WI'  // Token của bot Telegram

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
                echo 'Current working directory:'
                sh 'pwd'

                echo "Finding ${REPO_NAME} directory:"
                script {
                    def repoPath = sh(script: "find . -type d -name '${REPO_NAME}'", returnStdout: true).trim()
                    echo "Found ${REPO_NAME} at: ${repoPath}"
                    if (repoPath) {
                        env.REPO_PATH = repoPath
                    } else {
                        error "Repository directory ${REPO_NAME} not found."
                    }
                }

                echo "Changing directory to ${REPO_NAME} and listing contents:"
                sh """
                    cd ${env.REPO_PATH}
                    pwd
                    ls -la
                """
            }
        }

        stage('Verify Installation and Setup Dependencies') {
            steps {
                script {
                    dir("${env.REPO_PATH}") {
                        def nodePath = sh(script: "which node || echo 'Not_Installed'", returnStdout: true).trim()
                        def npmPath = sh(script: "which npm || echo 'Not_Installed'", returnStdout: true).trim()
                        def playwrightPath = sh(script: "which npx || echo 'Not_Installed'", returnStdout: true).trim()
                        def nodeVersion = sh(script: "node -v || echo 'Not_Installed'", returnStdout: true).trim()
                        def npmVersion = sh(script: "npm -v || echo 'Not_Installed'", returnStdout: true).trim()
                        def playwrightVersion = sh(script: "npx playwright --version || echo 'Not_Installed'", returnStdout: true).trim()

                        echo "Node Version: ${nodeVersion} at ${nodePath}"
                        echo "NPM Version: ${npmVersion} at ${npmPath}"
                        echo "Playwright Version: ${playwrightVersion} at ${playwrightPath}"
                        if (nodeVersion != 'Not_Installed' && npmVersion != 'Not_Installed' && playwrightVersion != 'Not_Installed') {
                            echo "Node, npm, and Playwright are already installed. Skipping setup."
                        } else {
                            echo "Node, npm, or Playwright not installed. Installing dependencies..."
                            sh """
                                cd ${env.REPO_PATH}
                                rm -rf node_modules package-lock.json
                                npm install
                                npx playwright install  
                                npm install @playwright/test@latest
                            """
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
                            cd ${env.REPO_PATH}
                            chmod +x ${FILE_SH} 
                            ./${FILE_SH}
                        """
                    } else {
                        bat """
                            cd ${env.REPO_PATH}
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
    }

    post {
        success {
            script {
                def status = currentBuild.result ?: 'SUCCESS'
                echo "All test cases passed. Build status: ${status}"

                // Send success notification to Telegram
                def successMessage = "✅ Jenkins Build #${env.BUILD_NUMBER} Success!\n" +
                                     "🕒 Time: ${currentBuild.durationString}\n" +
                                     "🔗 Link: ${env.BUILD_URL}"
                sh "curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text='${successMessage}'"

                if (isUnix()) {
                    if (fileExists("${SERVER_PATH}/temp")) {
                        sh "rm -rf ${SERVER_PATH}/temp/*"
                    } else {
                        echo "Temporary folder does not exist."
                    }
                } else {
                    bat "if exist ${SERVER_PATH}\\temp\\* del /Q ${SERVER_PATH}\\temp\\*"
                }
            }
        }
        failure {
            script {
                def status = currentBuild.result ?: 'FAILURE'
                echo "Some test cases failed. Build status: ${status}"

                // Send failure notification to Telegram
                def failureMessage = "❌ Jenkins Build #${env.BUILD_NUMBER} Failed!\n" +
                                     "🕒 Time: ${currentBuild.durationString}\n" +
                                     "🔗 Link: ${env.BUILD_URL}"
                sh "curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text='${failureMessage}'"

                if (isUnix()) {
                    if (fileExists("${SERVER_PATH}/temp")) {
                        sh "rm -rf ${SERVER_PATH}/temp/*"
                    } else {
                        echo "Temporary folder does not exist."
                    }
                } else {
                    bat "if exist ${SERVER_PATH}\\temp\\* del /Q ${SERVER_PATH}\\temp\\*"
                }
            }
        }
    }
}
