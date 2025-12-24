const express = require('express');
const router = express.Router();
const path = require('path');

const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.session.userId || req.session.userRole !== 'admin') {
        return res.redirect('/');
    }
    next();
};

const requireStaff = (req, res, next) => {
    if (!req.session.userId || (req.session.userRole !== 'staff' && req.session.userRole !== 'admin')) {
        return res.redirect('/');
    }
    next();
};

const requireCustomer = (req, res, next) => {
    if (!req.session.userId || req.session.userRole !== 'customer') {
        return res.redirect('/');
    }
    next();
};

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
});

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
});

router.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/menu.html'));
});

router.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/order.html'));
});

router.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/login.html'));
});

router.get('/staff/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/staff/login.html'));
});

router.get('/staff/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/staff/register.html'));
});

router.get('/admin/dashboard', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/dashboard.html'));
});

router.get('/admin/users', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/users.html'));
});

router.get('/admin/users/staff', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/staff-table.html'));
});

router.get('/admin/users/customers', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/customer-table.html'));
});

router.get('/admin/users/add', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/add-staff.html'));
});

router.get('/admin/menus', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/menus.html'));
});

router.get('/admin/menus/view', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/view-menu.html'));
});

router.get('/admin/menus/add', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/add-menu.html'));
});

router.get('/admin/orders', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/orders.html'));
});

router.get('/admin/feedbacks', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/feedbacks.html'));
});

router.get('/staff/dashboard', requireStaff, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/staff/dashboard.html'));
});

router.get('/staff/orders', requireStaff, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/staff/orders.html'));
});

router.get('/staff/bills', requireStaff, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/staff/bills.html'));
});

router.get('/customer/dashboard', requireCustomer, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/customer/dashboard.html'));
});

router.get('/customer/menus', requireCustomer, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/customer/menus.html'));
});

router.get('/customer/orders', requireCustomer, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/customer/orders.html'));
});

router.get('/customer/bills', requireCustomer, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/customer/bills.html'));
});

router.get('/customer/feedbacks', requireCustomer, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/customer/feedbacks.html'));
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
