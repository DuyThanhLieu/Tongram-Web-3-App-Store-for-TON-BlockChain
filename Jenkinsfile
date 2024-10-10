pipeline {
    agent any
    environment {
        // Github repository details
        GITHUB_URL = 'https://github.com/DuyThanhLieu/Tongram-Web-3-App-Store-for-TON-BlockChain'
        REPO_NAME = 'Tongram-Web-3-App-Store-for-TON-BlockChain'
        BRANCH_NAME = 'main'
        
        // Jenkins details
        JENKINS_USERNAME = 'DuyThanhLieu'  
        JENKINS_ADDRESS = 'jenkins.playgroundvina.com'
        
        // Command to run on remote server
        COMMANDS = './BS_Auto.bat' 
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
    }
    post {
        always {
            script {
                // Get the build result and print it
                def status = currentBuild.result ?: 'SUCCESS'
                echo "Build status: ${status}"
                
                // Optional cleanup: only do this if you are sure
                // what needs to be cleaned up.
                echo "Skipping cleanup for safety."
            }
        }
    }
}
