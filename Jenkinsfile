pipeline {
    agent any
    environment {
        // Github repository details
        GITHUB_URL = 'https://github.com/DuyThanhLieu/Tongram-Web-3-App-Store-for-TON-BlockChain'
        REPO_NAME = 'Tongram-Web-3-App-Store-for-TON-BlockChain'
        BRANCH_NAME = 'main'
        JENKINS_USERNAME = 'DuyThanhLieu'  
         JENKINS_ADDRESS = 'https://jenkins.playgroundvina.com/' 
         COMMANDS = './BS_Auto.bat' 
        // Jenkins details
        JENKINS_USERNAME = 'DuyThanhLieu'  
        JENKINS_ADDRESS = 'jenkins.playgroundvina.com'
        
        // Command to run on remote server
        COMMANDS = './BS_Auto.bat'
        
        // Telegram bot details
        CHAT_ID = '-4520276469'  // Thay bằng chat ID của nhóm
        BOT_TOKEN = '8085219018:AAHSTNao6k9OucZc15LQ476N-039N8NR7WI'  // Thay bằng token của bot Telegram
    }
    stages {
        stage('Checkout code') {
            steps {
                // Clone the specified branch from the repository
                git branch: "${BRANCH_NAME}", url: "${GITHUB_URL}"
            }
        }
        stage('Deploying...') {
            when {
                branch 'main' // Only deploy from the main branch
            }
            steps {
                script {
                    echo "Deploying to '${BRANCH_NAME}'..."
                    
                    // Run deployment command on the remote server
                    sh """
                    ssh -o StrictHostKeyChecking=no ${JENKINS_USERNAME}@${JENKINS_ADDRESS} '
                        cd ${REPO_NAME} &&
                        git pull &&
                        sudo make deploy repo_name=${REPO_NAME} branch_name=${BRANCH_NAME} &&
                        ${COMMANDS}
                    '
                    """
                }
            }
        }
        stage('Notify Telegram') {
            steps {
                script {
                    def message = "🔧 Jenkins Build #${env.BUILD_NUMBER}\n" +
                                  "✅ Status: ${currentBuild.currentResult}\n" +
                                  "🕒 Time: ${currentBuild.durationString}\n" +
                                  "🔗 Link: ${env.BUILD_URL}"

                    // Send notification to Telegram
                    sh "curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text='${message}'"
                }
            }
        }
    }
    post {
        always {
            script {
                // Get the build result and print it
                def status = currentBuild.result ?: 'SUCCESS'
                echo "Build status: ${status}"
                
                // Optional cleanup
                echo "Skipping cleanup for safety."
            }
        }
    }
}
