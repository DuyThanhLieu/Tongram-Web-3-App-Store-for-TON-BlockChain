pipeline {
    agent any
    environment {
        // Github
        GITHUB_URL = 'https://github.com/DuyThanhLieu/Tongram-Web-3-App-Store-for-TON-BlockChain'
        REPO_NAME = 'Tongram-Web-3-App-Store-for-TON-BlockChain'
        SERVER_PATH = 'Tongram-Web-3-App-Store-for-TON-BlockChain' // Cập nhật đường dẫn
        BRANCH_NAME = 'main'
        JENKINS_USERNAME = 'DuyThanhLieu'  
        JENKINS_ADDRESS = 'https://jenkins.playgroundvina.com/'  
        COMMANDS = './BS_Auto.bat'  
    }
    stages {
        stage('Checkout code') {
            steps {
                git branch: "${BRANCH_NAME}", url: "${GITHUB_URL}"
            }
        }
        stage('Deploying...') {
            when {
                anyOf {
                    branch 'master'
                    branch 'main'
                }
            }
            steps {
                dir("${SERVER_PATH}") {
                    script {
                        echo "Deploying to '${BRANCH_NAME}'..."
                        sh 'git pull'
                        sh "sudo make deploy repo_name=${REPO_NAME} branch_name=${BRANCH_NAME}"
                        sh "ssh -o StrictHostKeyChecking=no ${JENKINS_USERNAME}@${JENKINS_ADDRESS} '${COMMANDS}'"
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                def status = currentBuild.result ?: 'SUCCESS'
                echo "Build status: ${status}"
                sh "rm -rf ./* ./.??*"
            }
        }
    }
}
