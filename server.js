// BACKEND FOR THE PROJECT(node.js)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');
const { exec } = require('child_process');
const multer = require('multer');

dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'assests'))); //To showcase all the images
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_super_secret_key_for_development',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Note: Set 'secure: true' if using https
}));

// It's important to set a strong, unique secret in your production environment
if (process.env.NODE_ENV === 'production' && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET === 'your_super_secret_key_for_development')) {
    console.warn('WARNING: A default session secret is being used in a production environment. Please set a strong SESSION_SECRET environment variable.');
}

// Configure multer to store files in the assets folder
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'assests/images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    }
});

const upload = multer({ storage });

const pool = require('./db');

const staticRoutes = require('./routes/static');
app.use('/', staticRoutes);

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const staffRoutes = require('./routes/staff');
const customerRoutes = require('./routes/customer');

app.use('/', authRoutes);
app.use('/', adminRoutes);
app.use('/', staffRoutes);
app.use('/', customerRoutes);

// Server for listening
app.listen(3309, () => {
    console.log('Server is running on port http://127.0.0.1:3309');
});