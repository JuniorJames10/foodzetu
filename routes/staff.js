const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
};

const requireStaff = (req, res, next) => {
    if (!req.session.userId || (req.session.userRole !== 'staff' && req.session.userRole !== 'admin')) {
        return res.status(403).json({ success: false, message: 'Staff access required' });
    }
    next();
};

router.get('/staff/orders', requireStaff, async (req, res) => {
    try {
        const { status } = req.query;
        let query = supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
});

router.put('/staff/orders/:id', requireStaff, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'preparing', 'ready', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

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

router.get('/staff/bills', requireStaff, async (req, res) => {
    try {
        const { status } = req.query;
        let query = supabase
            .from('bills')
            .select('*')
            .order('created_at', { ascending: false });

        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch bills' });
    }
});

router.put('/staff/bills/:id', requireStaff, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['unpaid', 'paid'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const updateData = { status };
        if (status === 'paid') {
            updateData.paid_at = new Date().toISOString();
        }

        const { data, error } = await supabase
            .from('bills')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.json({ success: true, message: 'Bill updated successfully', data });
    } catch (error) {
        console.error('Error updating bill:', error);
        res.status(500).json({ success: false, message: 'Failed to update bill' });
    }
});

router.get('/staff/menus', requireStaff, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('menus')
            .select('*')
            .eq('available', true)
            .order('category', { ascending: true });

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch menus' });
    }
});

module.exports = router;
