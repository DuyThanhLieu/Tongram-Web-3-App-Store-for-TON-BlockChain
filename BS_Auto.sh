#!/bin/bash
# Busai GPT

# Ghi tên các test case thất bại vào file log
LOG_FILE="failure_cases.log"
> $LOG_FILE  # Xóa nội dung file log trước khi chạy

# Chạy các test case và ghi lại kết quả
echo "Bắt đầu thực hiện kiểm tra BS_Actions.spec.js"
npx playwright test TG_ActionsALLLogic.spec.js TG_Checkmenubar.spec.js TG_CheckPageFooter.spec.js --reporter=html --output=./Results --workers=1 | tee -a test_output.log

# Kiểm tra trạng thái của từng test case
totalTestCases=0
passedTestCases=0
failedTestCases=0

while IFS= read -r line; do
    if [[ "$line" == *"passed"* ]]; then
        ((passedTestCases++))
    elif [[ "$line" == *"failed"* ]]; then
        ((failedTestCases++))
        echo "${line}" >> $LOG_FILE  # Lưu tên test case vào file log nếu nó thất bại
    fi
    # Tăng tổng số test case
    ((totalTestCases++))
done < test_output.log

echo "Kiểm tra BS_Actions.spec.js đã hoàn thành"

# In kết quả ra màn hình
echo "Tổng số testcase: ${totalTestCases}"
echo "Testcase pass: ${passedTestCases}"
echo "Testcase fail: ${failedTestCases}"
