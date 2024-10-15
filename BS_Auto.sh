#!/bin/bash
# Busai GPT

# Ghi tên các test case thất bại vào file log
LOG_FILE="failure_cases.log"
TEST_OUTPUT_LOG="test_output.log"
> $LOG_FILE  # Xóa nội dung file log trước khi chạy
> $TEST_OUTPUT_LOG

# Chạy các test case và ghi lại kết quả
echo "Bắt đầu thực hiện kiểm tra các test case"
npx playwright test TG_ActionsALLLogic.spec.js TG_Checkmenubar.spec.js TG_CheckPageFooter.spec.js --reporter=dot --output=./Results --workers=1 | tee -a $TEST_OUTPUT_LOG

# Đếm tổng số testcase, passed và failed
totalTestCases=$(grep -oP '(?<=running\s)\d+(?=\stests)' $TEST_OUTPUT_LOG | head -1)
passedTestCases=$(grep -oP '(?<=\spassed\s)\d+(?=\stests)' $TEST_OUTPUT_LOG | head -1)
failedTestCases=$(grep -oP '(?<=\sfailed\s)\d+(?=\stests)' $TEST_OUTPUT_LOG | head -1)

# Ghi tên các test case thất bại vào file log
grep "FAILED" $TEST_OUTPUT_LOG >> $LOG_FILE

# Hiển thị kết quả
echo "Tổng số testcase: $totalTestCases"
echo "Testcase pass: $passedTestCases"
echo "Testcase fail: $failedTestCases"

# Thông báo kết quả
if [ "$failedTestCases" -gt 0 ]; then
    echo "❌ Có $failedTestCases test case thất bại. Chi tiết trong failure_cases.log"
else
    echo "✅ Tất cả test case đã pass."
fi
