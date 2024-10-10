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
    stages {
        stage('Checkout code') {
            steps {
                // Clone the specified branch from the repository
                git branch: "${BRANCH_NAME}", url: "${GITHUB_URL}"
            }
        }
        stage('Deploying...') {
            when {
                branch 'main' // Chỉ deploy từ nhánh main
            }
            steps {
                dir("${SERVER_PATH}") {
                    script {
                        echo "Deploying to '${BRANCH_NAME}'..."
                        sh 'git pull'
                        // Sử dụng đường dẫn đầy đủ cho lệnh make
                        sh """
                        sudo /usr/bin/make deploy repo_name=${REPO_NAME} branch_name=${BRANCH_NAME} > deploy.log 2>&1 || echo 'Deployment failed!'
                        """
                        // Thực hiện lệnh trên server từ xa
                        sh "ssh -o StrictHostKeyChecking=no ${JENKINS_USERNAME}@${JENKINS_ADDRESS} '${COMMANDS}'"
                    }
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
                
                // Ghi lại nhật ký
                sh "cat deploy.log" // In ra nhật ký deployment
                
                // Dọn dẹp
                sh "rm -rf ./* ./.??*"
            }
        }
    }
}
