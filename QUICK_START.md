# Quick Start Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account (database already provisioned)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The `.env` file should already have the Supabase credentials. Verify it contains:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
SESSION_SECRET=your_session_secret
NODE_ENV=development
PORT=3309
```

### 3. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run development
```

The server will start at `http://127.0.0.1:3309`

## Initial Setup

### Create an Admin User

Since this is a fresh installation, you'll need to create an admin user directly in the Supabase database:

1. Go to your Supabase project dashboard
2. Open the SQL Editor
3. Run this query (replace with your desired credentials):

```sql
INSERT INTO users (name, email, password_hash, role)
VALUES (
  'Admin User',
  'admin@rms.com',
  '$2b$10$YourBcryptHashedPasswordHere',
  'admin'
);
```

To generate a bcrypt hash for your password, you can use this Node.js snippet:

```javascript
const bcrypt = require('bcrypt');
const password = 'your_password';
bcrypt.hash(password, 10).then(hash => console.log(hash));
```

Or use an online bcrypt generator.

### Access the System

Once the admin user is created:

1. **Admin Access**: Navigate to `/admin/login`
   - Email: admin@rms.com
   - Password: (your password)

2. **Customer Registration**: Navigate to `/` (home page)
   - Click "Register" to create a customer account
   - New customers are automatically assigned the 'customer' role

3. **Staff Registration**: Currently done by admin
   - Login as admin
   - Navigate to Users section
   - Add new staff member

## Testing the System

### Test Flow

1. **As Admin**:
   - Login at `/admin/login`
   - Add menu items
   - Add staff members
   - View dashboard stats

2. **As Customer**:
   - Register at home page
   - Browse menu
   - Place an order
   - View order status
   - Submit feedback

3. **As Staff**:
   - Login at `/staff/login`
   - View orders
   - Update order status
   - Manage bills

## Common Issues

### Issue: Cannot connect to Supabase
**Solution**: Verify environment variables in `.env`

### Issue: Session not persisting
**Solution**: Ensure SESSION_SECRET is set in `.env`

### Issue: Images not uploading
**Solution**: Verify `public/images` directory exists and has write permissions

### Issue: RLS Policy Error
**Solution**: Ensure you're logged in and have appropriate role

## Directory Structure

```
project/
├── config/          # Configuration files
├── routes/          # API routes
├── public/          # Static assets
│   ├── css/        # Stylesheets
│   ├── js/         # Client-side JavaScript
│   └── images/     # Uploaded images
├── views/           # HTML templates
│   ├── admin/      # Admin pages
│   ├── staff/      # Staff pages
│   └── customer/   # Customer pages
└── server.js        # Express server
```

## Available Routes

### Public Routes
- `/` - Home page
- `/menu` - Menu listing
- `/order` - Order page
- `/admin/login` - Admin login
- `/staff/login` - Staff login
- `/staff/register` - Staff registration

### Protected Routes (require login)
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - User management
- `/admin/menus` - Menu management
- `/admin/orders` - Order management
- `/admin/feedbacks` - Feedback management
- `/staff/dashboard` - Staff dashboard
- `/staff/orders` - Staff order management
- `/staff/bills` - Staff bill management
- `/customer/dashboard` - Customer dashboard
- `/customer/menus` - Customer menu view
- `/customer/orders` - Customer order history
- `/customer/bills` - Customer bill history
- `/customer/feedbacks` - Customer feedback submission

## Development Tips

1. **Hot Reload**: Use `npm run development` for automatic server restarts
2. **Database Changes**: Apply migrations via Supabase dashboard
3. **Debugging**: Check browser console and server logs
4. **Testing API**: Use tools like Postman or curl

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Set a strong `SESSION_SECRET`
3. Configure `FRONTEND_URL` for CORS
4. Use HTTPS (set `secure: true` for cookies)
5. Deploy to platforms like:
   - Vercel
   - Railway
   - Heroku
   - DigitalOcean

## Need Help?

- Check `README.md` for detailed documentation
- Review `MODERNIZATION_SUMMARY.md` for architecture details
- Check Supabase logs for database issues
- Review browser console for frontend errors

---

**Happy coding!**
