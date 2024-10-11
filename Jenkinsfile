pipeline {
    agent any
    environment {
        // Thông tin repository GitHub
        GITHUB_URL = 'https://github.com/DuyThanhLieu/Tongram-Web-3-App-Store-for-TON-BlockChain'
        SERVER_PATH = 'Tongram-Web-3-App-Store-for-TON-BlockChain' // Cập nhật đường dẫn
        REPO_NAME = 'Tongram-Web-3-App-Store-for-TON-BlockChain'
        BRANCH_NAME = 'main'
        JENKINS_USERNAME = 'DuyThanhLieu'
        JENKINS_ADDRESS = 'jenkins.playgroundvina.com'
        
        // Lệnh thực hiện trên server từ xa
        COMMANDS = './BS_Auto.bat'
        
        // Thông tin bot Telegram
        CHAT_ID = '-4520276469'  // Thay bằng chat ID của nhóm
        BOT_TOKEN = '8085219018:AAHSTNao6k9OucZc15LQ476N-039N8NR7WI'  // Thay bằng token của bot Telegram
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
                            url: "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/chaukhau19/Automation_With_Playwright.git"
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
                echo "Checking if Data directory exists in ${REPO_PATH}:"
                sh "ls -la ${env.REPO_PATH}/Data || echo 'Data directory does not exist.'"
            }
        }

        stage('Setup Dependencies') {
            steps {
                echo 'Setting up dependencies'
                script {
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

        stage('Verify Playwright Installation') {
            steps {
                echo 'Verifying Playwright Installation'
                script {
                    sh 'node -v'  
                    sh 'npm -v' 
                    sh "ls -la ${env.REPO_PATH}/node_modules/playwright"
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
                            if [ -f ${FILE_SH} ]; then
                                chmod +x ${FILE_SH}
                                ./${FILE_SH}
                            else
                                echo "${FILE_SH} not found."
                            fi
                        """
                    } else {
                        bat """
                            cd ${env.REPO_PATH}
                            if exist ${FILE_BAT} (
                                ${FILE_BAT}
                            ) else (
                                echo ${FILE_BAT} not found.
                            )
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
