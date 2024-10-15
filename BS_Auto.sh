#!/bin/bash
# Busai GPT

# Tạo file để lưu tên test case thất bại
FAILURE_LOG="failure_cases.log"
> "$FAILURE_LOG"  # Xóa nội dung file nếu nó đã tồn tại

# Chạy test cases và lưu thông tin về các test case thất bại
echo "Bắt đầu thực hiện kiểm tra TG_ActionsALLLogic.spec.js, TG_Checkmenubar.spec.js và TG_CheckPageFooter.spec.js"
npx playwright test TG_ActionsALLLogic.spec.js TG_Checkmenubar.spec.js TG_CheckPageFooter.spec.js --reporter=html --output=./Results --workers=1 | tee output.log | grep -E "FAIL" | awk '{print $1}' >> "$FAILURE_LOG"

echo "Kiểm tra đã hoàn thành."

# Kiểm tra nếu có test case thất bại
if [[ -s "$FAILURE_LOG" ]]; then
    echo "Một số test cases đã thất bại:"
    cat "$FAILURE_LOG"
    exit 1  # Trả về mã lỗi để Jenkins biết có lỗi
else
    echo "Tất cả các test cases đã pass."
    exit 0  # Trả về mã thành công
fi
