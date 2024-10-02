import { test, expect } from '@playwright/test';
test('API Get request', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2')
    expect(response.status()).toBe(200)
})

test('Kiểm thử API - Yêu cầu GET', async ({ request }) => {
    // Gửi yêu cầu GET
    const response = await request.get('https://api.example.com/data');
    expect(response.status()).toBe(200);

    // Phân tích và xác thực JSON phản hồi
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data.name).toBe('John Doe');
});

test('Kiểm thử API - Yêu cầu POST', async ({ request }) => {
    // Gửi yêu cầu POST với dữ liệu
    const response = await request.post('https://api.example.com/data', {
        data: {
            name: 'Jane Doe',
            age: 30,
        },
    });
    expect(response.status()).toBe(201);

    // Phân tích và xác thực phản hồi
    const data = await response.json();
    expect(data.name).toBe('Jane Doe');
    expect(data.age).toBe(30);
});
test('Kết hợp kiểm thử API và UI', async ({ page, request }) => {
    // Tạo người dùng mới bằng API
    const response = await request.post('https://api.example.com/users', {
        data: { username: 'testuser', password: 'password123' },
    });
    expect(response.status()).toBe(201);

    // Điều hướng đến trang đăng nhập và thực hiện đăng nhập
    await page.goto('https://example.com/login');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    // Kiểm tra xem người dùng đã đăng nhập bằng cách kiểm tra trang chủ
    await expect(page.locator('h1')).toHaveText('Welcome, testuser');
});

