pipeline {
    agent any
    environment {
        // Thông tin repository GitHub
        GITHUB_URL = 'https://github.com/DuyThanhLieu/Tongram-Web-3-App-Store-for-TON-BlockChain'
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
    stages {
        stage('Checkout code') {
            steps {
                // Clone nhánh đã chỉ định từ repository
                git branch: "${BRANCH_NAME}", url: "${GITHUB_URL}"
            }
        }
        stage('Deploying...') {
            when {
                branch 'main' // Chỉ triển khai từ nhánh main
            }
            steps {
                script {
                    echo "Deploying to '${BRANCH_NAME}'..."
                    
                    // Chạy lệnh triển khai trên server từ xa
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

                    // Gửi thông báo đến Telegram
                    sh "curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text='${message}'"
                }
            }
        }
    }
    post {
        always {
            script {
                // Lấy kết quả build và in ra
                def status = currentBuild.result ?: 'SUCCESS'
                echo "Build status: ${status}"
                
                // Dọn dẹp tùy chọn
                echo "Skipping cleanup for safety."
            }
        }
    }
}
