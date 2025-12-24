# Restaurant Management System (RMS)

A modern, full-featured Restaurant Management System built with Node.js, Express, and Supabase.

## Features

### Multi-Role Access System
- **Admin**: Full system control, user management, menu management, order tracking, feedback monitoring
- **Staff**: Order management, bill processing, menu viewing
- **Customer**: Browse menu, place orders, track orders, view bills, submit feedback

### Modern Technology Stack
- **Backend**: Node.js with Express.js
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Frontend**: Vanilla JavaScript with modern CSS
- **Authentication**: Session-based with bcrypt password hashing
- **File Upload**: Multer for menu item images

## Project Structure

```
restaurant/
├── config/
│   └── supabase.js          # Supabase client configuration
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── admin.js             # Admin routes
│   ├── staff.js             # Staff routes
│   ├── customer.js          # Customer routes
│   └── static.js            # Static page routes
├── public/
│   ├── css/
│   │   ├── variables.css    # CSS variables and theme
│   │   ├── main.css         # Core styles and components
│   │   ├── dashboard.css    # Dashboard-specific styles
│   │   └── landing.css      # Landing page styles
│   ├── js/
│   │   ├── home.js          # Home page functionality
│   │   └── admin/           # Admin JavaScript modules
│   └── images/              # Uploaded images
├── views/
│   ├── admin/               # Admin HTML pages
│   ├── staff/               # Staff HTML pages
│   ├── customer/            # Customer HTML pages
│   ├── home.html            # Landing page
│   ├── menu.html            # Menu page
│   └── order.html           # Order page
├── server.js                # Express server
└── package.json             # Dependencies

```

## Database Schema

### Tables

#### users
- `id` (uuid): Primary key
- `name` (text): User's full name
- `email` (text): Unique email
- `password_hash` (text): Bcrypt hashed password
- `role` (text): 'admin', 'staff', or 'customer'
- `created_at`, `updated_at` (timestamptz)

#### menus
- `id` (uuid): Primary key
- `item_name` (text): Menu item name
- `price` (decimal): Item price
- `category` (text): Item category
- `img` (text): Image filename
- `available` (boolean): Availability status
- `created_at`, `updated_at` (timestamptz)

#### orders
- `id` (uuid): Primary key
- `customer_id` (uuid): Foreign key to users
- `customer_name` (text): Customer name
- `item_id` (uuid): Foreign key to menus
- `item_name` (text): Item name
- `quantity` (integer): Order quantity
- `status` (text): 'pending', 'preparing', 'ready', 'completed', 'cancelled'
- `created_at`, `updated_at` (timestamptz)

#### bills
- `id` (uuid): Primary key
- `order_id` (uuid): Foreign key to orders
- `customer_id` (uuid): Foreign key to users
- `item_name` (text): Item name
- `total_price` (decimal): Total amount
- `status` (text): 'unpaid' or 'paid'
- `paid_at` (timestamptz): Payment timestamp
- `created_at` (timestamptz)

#### feedbacks
- `id` (uuid): Primary key
- `customer_id` (uuid): Foreign key to users
- `customer_name` (text): Customer name
- `comment` (text): Feedback comment
- `rating` (integer): Rating (1-5)
- `created_at` (timestamptz)

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Admins can access all data
- Staff can view orders, bills, and menus
- Customers can only access their own orders, bills, and feedbacks

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SESSION_SECRET=your_session_secret
NODE_ENV=development
PORT=3309
```

3. The database schema is already applied via Supabase migration.

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Get current session

### Admin Routes
- `GET /api/admin/users` - Get all users
- `POST /api/admin/staff` - Add new staff
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/menus` - Get all menus
- `POST /api/admin/menus` - Add menu item
- `PUT /api/admin/menus/:id` - Update menu item
- `DELETE /api/admin/menus/:id` - Delete menu item
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status
- `GET /api/admin/feedbacks` - Get all feedbacks
- `DELETE /api/admin/feedbacks/:id` - Delete feedback
- `GET /api/admin/bills` - Get all bills

### Staff Routes
- `GET /api/staff/orders` - Get all orders
- `PUT /api/staff/orders/:id` - Update order status
- `GET /api/staff/bills` - Get all bills
- `PUT /api/staff/bills/:id` - Update bill status
- `GET /api/staff/menus` - Get available menus

### Customer Routes
- `GET /api/customer/menus` - Get available menus
- `POST /api/customer/orders` - Create new order
- `GET /api/customer/orders` - Get customer's orders
- `POST /api/customer/bills` - Create new bill
- `GET /api/customer/bills` - Get customer's bills
- `PUT /api/customer/bills/:id/pay` - Pay bill
- `POST /api/customer/feedbacks` - Submit feedback
- `GET /api/customer/feedbacks` - Get customer's feedbacks

## Design System

### Color Palette
- **Primary**: Blue (#3b82f6)
- **Secondary**: Teal (#14b8a6)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Heading Weights**: 600 (semibold) and 700 (bold)
- **Body Weight**: 400 (normal) and 500 (medium)

### Spacing System
- Base unit: 8px
- Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px

### Components
- Cards with hover effects
- Modern buttons (primary, secondary, outline, ghost)
- Form inputs with focus states
- Tables with hover rows
- Modals with backdrop
- Badges for status indicators
- Alerts for notifications

## Security Features

1. **Password Hashing**: Bcrypt with salt rounds
2. **Row Level Security**: Database-level access control
3. **Session Management**: HTTP-only cookies
4. **Input Validation**: Express-validator for all inputs
5. **CORS Configuration**: Controlled cross-origin requests
6. **SQL Injection Prevention**: Parameterized queries via Supabase client

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Future Enhancements

- Real-time order updates via WebSockets
- Payment gateway integration
- Email notifications
- Advanced analytics dashboard
- Mobile app (React Native)
- Multi-language support

## License

MIT

## Developer

ROSE MULEWA

---

For issues or questions, please contact: contact@rms.com
