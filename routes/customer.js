const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const supabase = require('../config/supabase');

const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
};

const requireCustomer = (req, res, next) => {
    if (!req.session.userId || req.session.userRole !== 'customer') {
        return res.status(403).json({ success: false, message: 'Customer access required' });
    }
    next();
};

router.get('/customer/menus', async (req, res) => {
    try {
        const { category } = req.query;
        let query = supabase
            .from('menus')
            .select('*')
            .eq('available', true);

        if (category && category !== 'all') {
            query = query.eq('category', category);
        }

        const { data, error } = await query.order('item_name', { ascending: true });

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch menus' });
    }
});

router.post('/customer/orders',
    requireCustomer,
    [
        body('itemId').notEmpty(),
        body('itemName').trim().notEmpty(),
        body('quantity').isInt({ min: 1 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const { itemId, itemName, quantity } = req.body;
            const customerId = req.session.userId;
            const customerName = req.session.userName;

            const { data, error } = await supabase
                .from('orders')
                .insert([{
                    customer_id: customerId,
                    customer_name: customerName,
                    item_id: itemId,
                    item_name: itemName,
                    quantity: parseInt(quantity),
                    status: 'pending'
                }])
                .select()
                .single();

            if (error) throw error;

            res.json({ success: true, message: 'Order placed successfully', data });
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ success: false, message: 'Failed to create order' });
        }
    }
);

router.get('/customer/orders', requireCustomer, async (req, res) => {
    try {
        const customerId = req.session.userId;

        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('customer_id', customerId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
});

router.post('/customer/bills',
    requireCustomer,
    [
        body('orderId').notEmpty(),
        body('itemName').trim().notEmpty(),
        body('totalPrice').isFloat({ min: 0 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const { orderId, itemName, totalPrice } = req.body;
            const customerId = req.session.userId;

            const { data, error } = await supabase
                .from('bills')
                .insert([{
                    order_id: orderId,
                    customer_id: customerId,
                    item_name: itemName,
                    total_price: parseFloat(totalPrice),
                    status: 'unpaid'
                }])
                .select()
                .single();

            if (error) throw error;

            res.json({ success: true, message: 'Bill created successfully', data });
        } catch (error) {
            console.error('Error creating bill:', error);
            res.status(500).json({ success: false, message: 'Failed to create bill' });
        }
    }
);

router.get('/customer/bills', requireCustomer, async (req, res) => {
    try {
        const customerId = req.session.userId;

        const { data, error } = await supabase
            .from('bills')
            .select('*')
            .eq('customer_id', customerId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch bills' });
    }
});

router.put('/customer/bills/:id/pay', requireCustomer, async (req, res) => {
    try {
        const { id } = req.params;
        const customerId = req.session.userId;

        const { data: bill } = await supabase
            .from('bills')
            .select('*')
            .eq('id', id)
            .eq('customer_id', customerId)
            .maybeSingle();

        if (!bill) {
            return res.status(404).json({ success: false, message: 'Bill not found' });
        }

        if (bill.status === 'paid') {
            return res.status(400).json({ success: false, message: 'Bill already paid' });
        }

        const { data, error } = await supabase
            .from('bills')
            .update({ status: 'paid', paid_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.json({ success: true, message: 'Bill paid successfully', data });
    } catch (error) {
        console.error('Error paying bill:', error);
        res.status(500).json({ success: false, message: 'Failed to pay bill' });
    }
});

router.post('/customer/feedbacks',
    requireCustomer,
    [
        body('comment').trim().notEmpty().withMessage('Comment is required'),
        body('rating').optional().isInt({ min: 1, max: 5 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const { comment, rating } = req.body;
            const customerId = req.session.userId;
            const customerName = req.session.userName;

            const { data, error } = await supabase
                .from('feedbacks')
                .insert([{
                    customer_id: customerId,
                    customer_name: customerName,
                    comment,
                    rating: rating ? parseInt(rating) : null
                }])
                .select()
                .single();

            if (error) throw error;

            res.json({ success: true, message: 'Feedback submitted successfully', data });
        } catch (error) {
            console.error('Error creating feedback:', error);
            res.status(500).json({ success: false, message: 'Failed to submit feedback' });
        }
    }
);

router.get('/customer/feedbacks', requireCustomer, async (req, res) => {
    try {
        const customerId = req.session.userId;

        const { data, error } = await supabase
            .from('feedbacks')
            .select('*')
            .eq('customer_id', customerId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch feedbacks' });
    }
});

module.exports = router;
