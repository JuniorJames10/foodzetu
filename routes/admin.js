const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const supabase = require('../config/supabase');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.session.userId || req.session.userRole !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    next();
};

router.get('/admin/users', requireAdmin, async (req, res) => {
    try {
        const { role } = req.query;
        let query = supabase.from('users').select('id, name, email, role, created_at');

        if (role) {
            query = query.eq('role', role);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
});

router.post('/admin/staff',
    requireAdmin,
    [
        body('name').trim().notEmpty(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const { name, email, password } = req.body;

            const { data: existing } = await supabase
                .from('users')
                .select('id')
                .eq('email', email)
                .maybeSingle();

            if (existing) {
                return res.status(400).json({ success: false, message: 'Email already exists' });
            }

            const password_hash = await bcrypt.hash(password, 10);

            const { data, error } = await supabase
                .from('users')
                .insert([{ name, email, password_hash, role: 'staff' }])
                .select()
                .single();

            if (error) throw error;

            res.json({ success: true, message: 'Staff added successfully', data });
        } catch (error) {
            console.error('Error adding staff:', error);
            res.status(500).json({ success: false, message: 'Failed to add staff' });
        }
    }
);

router.delete('/admin/users/:id', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: 'Failed to delete user' });
    }
});

router.get('/admin/menus', requireAuth, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('menus')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch menus' });
    }
});

router.post('/admin/menus', requireAdmin, upload.single('img'), async (req, res) => {
    try {
        const { itemName, price, category } = req.body;
        const img = req.file ? req.file.filename : null;

        const { data, error } = await supabase
            .from('menus')
            .insert([{
                item_name: itemName,
                price: parseFloat(price),
                category: category || 'general',
                img,
                available: true
            }])
            .select()
            .single();

        if (error) throw error;

        res.json({ success: true, message: 'Menu item added successfully', data });
    } catch (error) {
        console.error('Error adding menu:', error);
        res.status(500).json({ success: false, message: 'Failed to add menu item' });
    }
});

router.put('/admin/menus/:id', requireAdmin, upload.single('img'), async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, price, category, available } = req.body;

        const updateData = {
            item_name: itemName,
            price: parseFloat(price),
            category: category || 'general',
            available: available === 'true' || available === true
        };

        if (req.file) {
            updateData.img = req.file.filename;
        }

        const { data, error } = await supabase
            .from('menus')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.json({ success: true, message: 'Menu item updated successfully', data });
    } catch (error) {
        console.error('Error updating menu:', error);
        res.status(500).json({ success: false, message: 'Failed to update menu item' });
    }
});

router.delete('/admin/menus/:id', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from('menus')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.json({ success: true, message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu:', error);
        res.status(500).json({ success: false, message: 'Failed to delete menu item' });
    }
});

router.get('/admin/orders', requireAdmin, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
});

router.put('/admin/orders/:id', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.json({ success: true, message: 'Order updated successfully', data });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, message: 'Failed to update order' });
    }
});

router.get('/admin/feedbacks', requireAdmin, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('feedbacks')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch feedbacks' });
    }
});

router.delete('/admin/feedbacks/:id', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from('feedbacks')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.json({ success: true, message: 'Feedback deleted successfully' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ success: false, message: 'Failed to delete feedback' });
    }
});

router.get('/admin/bills', requireAdmin, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('bills')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch bills' });
    }
});

module.exports = router;
