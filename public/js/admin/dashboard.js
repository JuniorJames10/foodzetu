const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const themeToggle = document.getElementById('themeToggle');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('bx-moon');
        icon.classList.add('bx-sun');
    } else {
        icon.classList.remove('bx-sun');
        icon.classList.add('bx-moon');
    }
});

async function loadDashboardStats() {
    try {
        const [usersRes, menusRes, ordersRes, feedbacksRes] = await Promise.all([
            fetch('/api/admin/users'),
            fetch('/api/admin/menus'),
            fetch('/api/admin/orders'),
            fetch('/api/admin/feedbacks')
        ]);

        const [usersData, menusData, ordersData, feedbacksData] = await Promise.all([
            usersRes.json(),
            menusRes.json(),
            ordersRes.json(),
            feedbacksRes.json()
        ]);

        if (usersData.success) {
            document.getElementById('totalUsers').textContent = usersData.data.length;
        }
        if (menusData.success) {
            document.getElementById('totalMenus').textContent = menusData.data.length;
        }
        if (ordersData.success) {
            document.getElementById('totalOrders').textContent = ordersData.data.length;
        }
        if (feedbacksData.success) {
            document.getElementById('totalFeedbacks').textContent = feedbacksData.data.length;
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const routes = ['/admin/users', '/admin/menus', '/admin/orders', '/admin/feedbacks'];
        window.location.href = routes[index];
    });
});

loadDashboardStats();
