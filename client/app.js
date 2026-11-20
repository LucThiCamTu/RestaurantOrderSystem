const API_URL = 'http://localhost:5262';
let currentPage = 1;
const pageSize = 3;

function switchTab(tabId, btnElement) {
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

    document.getElementById(`tab-${tabId}`).classList.add('active');
    btnElement.classList.add('active');
}

async function checkSystem() {
    const icon = document.getElementById('status-icon');
    const title = document.getElementById('status-title');
    const message = document.getElementById('status-message');
    const overviewApiStatus = document.getElementById('stat-api-status');

    icon.innerText = '⏳';
    title.innerText = 'Đang kiểm tra...';
    title.style.color = '#1e293b';

    try {
        const res = await fetch(`${API_URL}/api/health`);
        const data = await res.json();
        if (data.success) {
            icon.innerText = '✅';
            title.innerText = 'Hệ thống hoạt động bình thường';
            title.style.color = '#059669';
            message.innerText = data.message;
            if (overviewApiStatus) {
                overviewApiStatus.innerText = 'Hoạt động';
                overviewApiStatus.style.color = '#059669';
            }
        }
    } catch (error) {
        icon.innerText = '❌';
        title.innerText = 'Mất kết nối hệ thống';
        title.style.color = '#dc2626';
        message.innerText = 'Không thể kết nối đến Backend Server. Hãy kiểm tra lại server!';
        if (overviewApiStatus) {
            overviewApiStatus.innerText = 'Mất kết nối';
            overviewApiStatus.style.color = '#dc2626';
        }
    }
}

async function loadMenu(page = 1) {
    currentPage = page;
    const menuContainer = document.getElementById('menu-list');
    const paginationContainer = document.getElementById('pagination');
    const totalMenuStat = document.getElementById('stat-total-menu');

    try {
        const res = await fetch(`${API_URL}/menu?page=${page}&pageSize=${pageSize}`);
        const data = await res.json();
        const items = Array.isArray(data) ? data : (data.items || []);
        const totalItems = Array.isArray(data) ? data.length : (data.totalItems ?? items.length);

        if (totalMenuStat) {
            totalMenuStat.innerText = totalItems;
        }

        if (items.length === 0) {
            menuContainer.innerHTML = '<p style="text-align:center;grid-column:1/-1;">Hiện chưa có món ăn nào trong thực đơn.</p>';
            paginationContainer.innerHTML = '';
            return;
        }

        menuContainer.innerHTML = items.map(item => `
            <div class="menu-card">
                <div>
                    <span class="menu-category">${item.category}</span>
                    <h3>${item.name}</h3>
                    <p class="menu-desc">${item.description}</p>
                </div>
                <div class="menu-footer">
                    <span class="menu-price">${Number(item.price).toLocaleString('vi-VN')} đ</span>
                </div>
            </div>
        `).join('');

        renderPagination(data.currentPage || 1, data.totalPages || 1);
    } catch (error) {
        menuContainer.innerHTML = '<p style="color:#dc2626;text-align:center;grid-column:1/-1;">Lỗi tải thực đơn từ server!</p>';
        paginationContainer.innerHTML = '';
    }
}

function renderPagination(current, total) {
    const container = document.getElementById('pagination');
    if (total <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = `<button class="page-btn" onclick="loadMenu(${current - 1})" ${current === 1 ? 'disabled' : ''}>« Trước</button>`;
    for (let i = 1; i <= total; i++) {
        html += `<button class="page-btn ${i === current ? 'active' : ''}" onclick="loadMenu(${i})">${i}</button>`;
    }
    html += `<button class="page-btn" onclick="loadMenu(${current + 1})" ${current === total ? 'disabled' : ''}>Sau »</button>`;
    container.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', () => {
    checkSystem();
    loadMenu(1);
});