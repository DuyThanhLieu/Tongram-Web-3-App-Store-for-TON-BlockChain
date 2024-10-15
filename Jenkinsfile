pipeline {
    // Định nghĩa môi trường chạy cho pipeline, sử dụng Docker image có chứa Playwright
    agent {
        docker { image 'mcr.microsoft.com/playwright:v1.47.2-jammy' }  
    }
    environment {
        // Các biến môi trường cần thiết cho pipeline
        GITHUB_URL = 'https://github.com/DuyThanhLieu/Tongram-Web-3-App-Store-for-TON-BlockChain' // URL của repository GitHub
        REPO_NAME = 'Tongram-Web-3-App-Store-for-TON-BlockChain' // Tên repository
        BRANCH_NAME = 'main' // Tên nhánh cần kiểm tra
        JENKINS_USERNAME = 'DuyThanhLieu' // Tên người dùng Jenkins
        JENKINS_ADDRESS = 'jenkins.playgroundvina.com' // Địa chỉ Jenkins
        FILE_SH = 'BS_Auto.sh' // Tên file shell script
        FILE_BAT = 'BS_Auto.bat' // Tên file batch script
        JENKINS_CREDENTIALS_ID = '5c7bd325-a531-4236-8534-102e45de69e7' // ID thông tin xác thực Jenkins
        CHAT_ID = '-1002308985537' // Chat ID cho Telegram
        BOT_TOKEN = '8085219018:AAHSTNao6k9OucZc15LQ476N-039N8NR7WI' // Token của bot Telegram
    }

    // triggers {
    //     // Thiết lập trigger để chạy pipeline theo lịch trình, trong trường hợp này là mỗi ngày lúc 00:00
    //     cron('0 0 * * *') 
    // }
    triggers {
    // Thiết lập trigger để chạy pipeline mỗi ngày lúc 11:47 AM UTC+7
    cron('47 4 * * *') // 11:47 AM UTC+7 tương đương với 4:47 AM UTC
}

    stages {
        // Stage kiểm tra mã nguồn từ GitHub
        stage('Preparation') {
            steps {
                script {
                    echo "Preparing environment..." // Thông báo đang chuẩn bị môi trường
                    // Checkout Code
                    // Sử dụng thông tin xác thực để checkout mã từ GitHub
                    withCredentials([usernamePassword(credentialsId: "${JENKINS_CREDENTIALS_ID}", usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                        git branch: "${BRANCH_NAME}", 
                            credentialsId: "${JENKINS_CREDENTIALS_ID}", 
                            url: "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/DuyThanhLieu/Tongram-Web-3-App-Store-for-TON-BlockChain"
                    }
                    echo "Code checked out from ${BRANCH_NAME}" // Thông báo đã checkout mã
                    echo "Current working directory:" // Thông báo đường dẫn hiện tại
                    sh 'pwd' // Lấy đường dẫn hiện tại
                }
            }
        }

        // Stage kiểm tra và cài đặt các phụ thuộc cần thiết
        stage('Verify Installation and Setup Dependencies') {
            steps {
                script {
                    dir("${env.WORKSPACE}") { // Chuyển đến thư mục làm việc hiện tại
                        def installations = ['node', 'npm', 'npx'] // Danh sách các công cụ cần kiểm tra
                        def allInstalled = true // Biến để theo dõi trạng thái cài đặt

                        // Vòng lặp kiểm tra từng công cụ
                        for (def tool : installations) {
                            def toolPath = sh(script: "which ${tool} || echo 'Not_Installed'", returnStdout: true).trim()
                            if (toolPath == 'Not_Installed') {
                                allInstalled = false // Đánh dấu nếu một công cụ chưa được cài đặt
                                echo "${tool} is not installed. Installing dependencies..." // Thông báo cài đặt
                            } else {
                                echo "${tool} is installed at ${toolPath}." // Thông báo nếu công cụ đã cài đặt
                            }
                        }

                        // Nếu có công cụ chưa được cài đặt, tiến hành cài đặt
                        if (!allInstalled) {
                            sh """
                                rm -rf node_modules package-lock.json // Xóa thư mục modules và file lock
                                npm install // Cài đặt lại các phụ thuộc
                                npx playwright install  // Cài đặt Playwright
                                npm install @playwright/test@latest // Cài đặt phiên bản mới nhất của @playwright/test
                            """
                        } else {
                            echo "Node, npm, and Playwright are already installed. Skipping setup." // Thông báo nếu không cần cài đặt
                        }
                    }
                }
            }
        }

        // Stage chạy các bài kiểm tra
        stage('CD: Run Tests') {
            steps {
                echo 'Starting Tests' // Thông báo bắt đầu chạy tests
                script {
                    // Kiểm tra xem hệ điều hành có phải Unix hay không để chọn cách chạy khác nhau
                    if (isUnix()) {
                        sh """
                            ls -la  # Liệt kê các tệp để đảm bảo BS_Auto.sh có ở đó
                            chmod +x ${FILE_SH} // Thiết lập quyền thực thi cho script
                            ./${FILE_SH} // Chạy script
                        """
                    } else {
                        bat """
                            dir  # Liệt kê các tệp để đảm bảo BS_Auto.bat có ở đó
                            ${FILE_BAT} // Chạy batch script
                        """
                    }
                }
                echo "Tests executed" // Thông báo đã chạy xong tests
            }
        }

        // Stage lưu trữ kết quả kiểm tra
        stage('Archive Test Results') {
            steps {
                archiveArtifacts artifacts: '**/playwright-report/**/*', allowEmptyArchive: true // Lưu trữ kết quả kiểm tra
                echo 'Test results archived.' // Thông báo đã lưu trữ kết quả
            }
        }

        // Stage gửi thông báo đến Telegram
        stage('Notify') {
            steps {
                script {
                    def status = currentBuild.result ?: 'SUCCESS' // Lấy trạng thái của build
                    def message = (status == 'SUCCESS') ? "✅ Jenkins Build #${env.BUILD_NUMBER} Success!" : "❌ Jenkins Build #${env.BUILD_NUMBER} Failed!" // Tạo thông điệp dựa trên trạng thái
                    message += "\n🕒 Time: ${currentBuild.durationString}\n🔗 Link: ${env.BUILD_URL}" // Thêm thời gian và link vào thông điệp
                    // Gửi thông báo đến Telegram
                    sh "curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text='${message}'"
                }
            }
        }

        // Stage xóa tài nguyên không còn cần thiết
        stage('Clear Resources') {
            steps {
                script {
                    echo 'Cleaning up resources...' // Thông báo đang dọn dẹp tài nguyên
                    sh """
                        rm -rf node_modules package-lock.json // Xóa thư mục modules và file lock
                        echo 'Resources cleaned.' // Thông báo đã dọn dẹp xong
                    """
                }
            }
        }
    }

    // Phần xử lý sau khi các stage hoàn thành
    post {
        always {
            script {
                // Chạy giai đoạn dọn dẹp để đảm bảo tài nguyên luôn được xóa
                echo 'Running cleanup...'
                sh """
                    rm -rf node_modules package-lock.json // Xóa tài nguyên không cần thiết
                    echo 'Cleanup completed.' // Thông báo dọn dẹp hoàn thành
                """
            }
        }
    }
}
