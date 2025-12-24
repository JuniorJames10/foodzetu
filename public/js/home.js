const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
    });
});

function showLoginModal() {
    loginModal.classList.add('active');
}

function closeLoginModal() {
    loginModal.classList.remove('active');
}

function showRegisterModal() {
    registerModal.classList.add('active');
}

function closeRegisterModal() {
    registerModal.classList.remove('active');
}

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeLoginModal();
    }
});

registerModal.addEventListener('click', (e) => {
    if (e.target === registerModal) {
        closeRegisterModal();
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert('Login successful!');
            if (result.user.role === 'customer') {
                window.location.href = '/customer/dashboard';
            } else if (result.user.role === 'staff') {
                window.location.href = '/staff/dashboard';
            } else if (result.user.role === 'admin') {
                window.location.href = '/admin/dashboard';
            }
        } else {
            alert(result.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: 'customer'
    };

    const confirmPassword = formData.get('confirmPassword');

    if (data.password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert('Registration successful!');
            window.location.href = '/customer/dashboard';
        } else {
            alert(result.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
            const result = await response.json();
            if (result.success && result.user) {
                const accountDropdown = document.querySelector('.dropdown-menu');
                accountDropdown.innerHTML = `
                    <div style="padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--border-color);">
                        <strong>${result.user.name}</strong>
                        <br>
                        <small>${result.user.role}</small>
                    </div>
                    <a href="/${result.user.role}/dashboard" class="dropdown-item">Dashboard</a>
                    <a href="#" class="dropdown-item" onclick="logout(); return false;">Logout</a>
                `;
            }
        }
    } catch (error) {
        console.log('Not authenticated');
    }
});

async function logout() {
    try {
        const response = await fetch('/api/auth/logout', { method: 'POST' });
        const result = await response.json();
        if (result.success) {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
}
