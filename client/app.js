const API_URL = 'http://localhost:3000';

async function checkSystem() {
    const icon = document.getElementById('status-icon');
    const title = document.getElementById('status-title');
    const message = document.getElementById('status-message');

    // Hiển thị trạng thái đang kiểm tra khi bấm nút
    icon.innerText = '⏳';
    title.innerText = 'Đang kiểm tra...';
    title.style.color = '#222';
    message.innerText = 'Vui lòng chờ trong giây lát.';

    try {
        const response = await fetch(`${API_URL}/api/health`);
        const data = await response.json();

        if (response.ok) {
            icon.innerText = '✅';
            title.innerText = 'Hệ thống hoạt động bình thường';
            title.style.color = '#2ecc71';
            message.innerText = data.message || `Kết nối thành công tới Server (${data.status || 'OK'})`;
            console.log('Kết nối Backend thành công:', data);
        } else {
            throw new Error('Server phản hồi lỗi');
        }
    } catch (error) {
        icon.innerText = '❌';
        title.innerText = 'Mất kết nối hệ thống';
        title.style.color = '#e74c3c';
        message.innerText = 'Không thể kết nối đến Backend Server. Hãy kiểm tra lại server!';
        console.error('Lỗi kết nối:', error);
    }
}

// Tự động chạy khi tải trang
window.addEventListener('DOMContentLoaded', checkSystem);