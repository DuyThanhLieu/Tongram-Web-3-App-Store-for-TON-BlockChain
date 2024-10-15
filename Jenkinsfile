stage('CD: Run Tests') {
    steps {
        echo 'Starting Tests'
        script {
            if (isUnix()) {
                sh """
                    cd ${env.REPO_PATH}
                    ls -la  # Liệt kê các tệp để đảm bảo BS_Auto.sh có ở đó
                    chmod +x BS_Auto.sh 
                    ./BS_Auto.sh
                """
            } else {
                bat """
                    cd ${env.REPO_PATH}
                    dir  # Liệt kê các tệp để đảm bảo BS_Auto.bat có ở đó
                    ${FILE_BAT}
                """
            }

            // Kiểm tra kết quả và lấy tên các test case thất bại
            def testResult = sh(script: 'cat failure_cases.log', returnStatus: true, returnStdout: true)
            if (testResult) {
                def failedTests = testResult.trim().split('\n')
                failedTests.each { testCase ->
                    // Gửi thông báo đến Telegram cho từng test case thất bại
                    def failureMessage = "❌ Test Case Failed: ${testCase}\n" +
                                         "🔗 Build: ${env.BUILD_URL}\n" +
                                         "🕒 Duration: ${currentBuild.durationString}"
                    sh "curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text='${failureMessage}'"
                }
                error "Some test cases failed. Check the log for details."
            } else {
                echo "All test cases passed."
            }
        }
        echo "Tests executed"
    }
}
