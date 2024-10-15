#!/bin/bash
# Busai GPT

# Ghi tên các test case thất bại vào file log
LOG_FILE="failure_cases.log"
TEST_OUTPUT_LOG="test_output.log"
> $LOG_FILE  # Xóa nội dung file log trước khi chạy
> $TEST_OUTPUT_LOG

# Chạy các test case và ghi lại kết quả
echo "Bắt đầu thực hiện kiểm tra các test case"
npx playwright test TG_ActionsALLLogic.spec.js TG_Checkmenubar.spec.js TG_CheckPageFooter.spec.js --reporter=json --output=./Results --workers=1 > $TEST_OUTPUT_LOG

# Parse kết quả test từ JSON (Playwright xuất kết quả json)
TOTAL_TESTS=$(jq '.suites[].specs | length' ./Results/report.json | awk '{s+=$1} END {print s}')
PASSED_TESTS=$(jq '.suites[].specs[] | select(.ok == true) | length' ./Results/report.json | wc -l)
FAILED_TESTS=$(jq '.suites[].specs[] | select(.ok == false) | length' ./Results/report.json | wc -l)

# Ghi vào log nếu có test case thất bại
if [ $FAILED_TESTS -gt 0 ]; then
  jq -r '.suites[].specs[] | select(.ok == false) | .title' ./Results/report.json >> $LOG_FILE
fi

echo "Tổng số testcase: $TOTAL_TESTS"
echo "Testcase pass: $PASSED_TESTS"
echo "Testcase fail: $FAILED_TESTS"

echo "Kiểm tra đã hoàn thành"
