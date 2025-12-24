# Pages to Complete

This document lists all the remaining pages that need to be created using the modern design patterns established in the system.

## Completed Pages (Examples)

These pages demonstrate the modern patterns to follow:

- ✅ `views/home.html` - Modern landing page with navbar, hero, features
- ✅ `views/admin/login.html` - Clean login page with card design
- ✅ `views/admin/dashboard.html` - Dashboard with sidebar, stats cards

## Pages to Create

Use the completed pages as templates. Follow the same design patterns, component structure, and API integration.

### Admin Pages

#### 1. Users Management (`views/admin/users.html`)
- **Purpose**: Navigation page for user management
- **Components**:
  - Sidebar navigation
  - Two cards: "View Users" and "Add Staff"
  - Click cards to navigate to respective pages
- **Pattern**: Similar to menu management page structure
- **API**: GET `/api/admin/users`

#### 2. Staff Table (`views/admin/staff-table.html`)
- **Purpose**: List all staff members
- **Components**:
  - Sidebar navigation
  - Back button to users page
  - Data table with columns: Name, Email, Actions
  - Delete button for each staff
- **Pattern**: Table component from main.css
- **API**: GET `/api/admin/users?role=staff`, DELETE `/api/admin/users/:id`

#### 3. Customer Table (`views/admin/customer-table.html`)
- **Purpose**: List all customers
- **Components**:
  - Sidebar navigation
  - Back button to users page
  - Data table with columns: Name, Email, Actions
  - View orders button for each customer
- **Pattern**: Table component from main.css
- **API**: GET `/api/admin/users?role=customer`

#### 4. Add Staff Form (`views/admin/add-staff.html`)
- **Purpose**: Form to add new staff member
- **Components**:
  - Sidebar navigation
  - Form with: Name, Email, Password, Confirm Password
  - Submit and Cancel buttons
- **Pattern**: Form components from main.css
- **API**: POST `/api/admin/staff`
- **Validation**: Email format, password match, minimum 6 characters

#### 5. Menu Management (`views/admin/menus.html`)
- **Purpose**: Navigation page for menu management
- **Components**:
  - Sidebar navigation
  - Two cards: "View Menu" and "Add Menu Item"
- **Pattern**: Similar to users management
- **API**: None (navigation only)

#### 6. View Menu (`views/admin/view-menu.html`)
- **Purpose**: Display all menu items in grid
- **Components**:
  - Sidebar navigation
  - Back button
  - Cards grid showing: Image, Name, Price, Category
  - Edit and Delete buttons on each card
- **Pattern**: Cards grid from dashboard.css
- **API**: GET `/api/admin/menus`, DELETE `/api/admin/menus/:id`

#### 7. Add Menu Form (`views/admin/add-menu.html`)
- **Purpose**: Form to add new menu item
- **Components**:
  - Sidebar navigation
  - Form with: Item Name, Price, Category, Image Upload
  - Submit and Cancel buttons
- **Pattern**: Form with file input
- **API**: POST `/api/admin/menus` (multipart/form-data)

#### 8. Edit Menu Form (`views/admin/edit-menu.html`)
- **Purpose**: Form to edit existing menu item
- **Components**:
  - Sidebar navigation
  - Pre-filled form with current values
  - Option to change image
  - Submit and Cancel buttons
- **Pattern**: Similar to add menu
- **API**: PUT `/api/admin/menus/:id`

#### 9. Orders Page (`views/admin/orders.html`)
- **Purpose**: View and manage all orders
- **Components**:
  - Sidebar navigation
  - Data table: Order ID, Customer, Item, Quantity, Status
  - Status badge (color-coded)
  - Filter by status dropdown
- **Pattern**: Table with badges
- **API**: GET `/api/admin/orders`

#### 10. Feedbacks Page (`views/admin/feedbacks.html`)
- **Purpose**: View all customer feedbacks
- **Components**:
  - Sidebar navigation
  - Cards or table: Customer Name, Comment, Rating, Date
  - Delete button
  - Rating stars display
- **Pattern**: Cards grid or table
- **API**: GET `/api/admin/feedbacks`, DELETE `/api/admin/feedbacks/:id`

### Staff Pages

#### 11. Staff Login (`views/staff/login.html`)
- **Purpose**: Staff login page
- **Components**:
  - Centered card
  - Email and password inputs
  - Login button
  - Link to registration
- **Pattern**: Similar to admin login
- **API**: POST `/api/auth/login`

#### 12. Staff Registration (`views/staff/register.html`)
- **Purpose**: Staff self-registration
- **Components**:
  - Centered card
  - Form: Name, Email, Password, Confirm Password
  - Register button
  - Link to login
- **Pattern**: Similar to admin login style
- **API**: POST `/api/auth/register` with role='staff'

#### 13. Staff Dashboard (`views/staff/dashboard.html`)
- **Purpose**: Staff overview page
- **Components**:
  - Sidebar navigation
  - Stats cards: Total Orders, Pending Bills, Today's Orders
  - Quick action cards: Orders, Bills
- **Pattern**: Similar to admin dashboard
- **API**: GET `/api/staff/orders`, GET `/api/staff/bills`

#### 14. Staff Orders (`views/staff/orders.html`)
- **Purpose**: Manage orders
- **Components**:
  - Sidebar navigation
  - Data table: Order ID, Customer, Item, Quantity, Status
  - Status dropdown (update inline)
  - Filter options
- **Pattern**: Interactive table
- **API**: GET `/api/staff/orders`, PUT `/api/staff/orders/:id`

#### 15. Staff Bills (`views/staff/bills.html`)
- **Purpose**: Manage bills
- **Components**:
  - Sidebar navigation
  - Data table: Bill ID, Customer, Amount, Status
  - Mark as Paid button
- **Pattern**: Table with action buttons
- **API**: GET `/api/staff/bills`, PUT `/api/staff/bills/:id`

### Customer Pages

#### 16. Customer Dashboard (`views/customer/dashboard.html`)
- **Purpose**: Customer overview
- **Components**:
  - Sidebar navigation
  - Stats cards: Active Orders, Total Bills, Feedbacks Given
  - Recent orders table
  - Quick actions: Menu, Order
- **Pattern**: Dashboard layout
- **API**: GET `/api/customer/orders`, GET `/api/customer/bills`

#### 17. Customer Menu (`views/customer/menus.html`)
- **Purpose**: Browse and search menu
- **Components**:
  - Sidebar navigation
  - Category filter
  - Search bar
  - Menu cards grid: Image, Name, Price, Order button
- **Pattern**: Cards grid with filters
- **API**: GET `/api/customer/menus`

#### 18. Customer Orders (`views/customer/orders.html`)
- **Purpose**: Place and track orders
- **Components**:
  - Sidebar navigation
  - Order form: Select item (dropdown), Quantity
  - Order history table
  - Status badges
- **Pattern**: Form + table
- **API**: POST `/api/customer/orders`, GET `/api/customer/orders`

#### 19. Customer Bills (`views/customer/bills.html`)
- **Purpose**: View and pay bills
- **Components**:
  - Sidebar navigation
  - Bills table: Bill ID, Items, Amount, Status, Actions
  - Pay button for unpaid bills
  - Payment confirmation modal
- **Pattern**: Table with modals
- **API**: GET `/api/customer/bills`, PUT `/api/customer/bills/:id/pay`

#### 20. Customer Feedback (`views/customer/feedbacks.html`)
- **Purpose**: Submit and view feedback
- **Components**:
  - Sidebar navigation
  - Feedback form: Comment textarea, Rating (stars)
  - Previous feedbacks list
- **Pattern**: Form + cards
- **API**: POST `/api/customer/feedbacks`, GET `/api/customer/feedbacks`

### Public Pages

#### 21. Menu Page (`views/menu.html`)
- **Purpose**: Public menu display
- **Components**:
  - Navbar
  - Category tabs
  - Menu cards grid
  - Footer
  - Login/Register prompts for ordering
- **Pattern**: Landing page style
- **API**: GET `/api/customer/menus`

#### 22. Order Page (`views/order.html`)
- **Purpose**: Order placement for guests
- **Components**:
  - Navbar
  - Menu items with add to cart
  - Cart sidebar (sticky)
  - Checkout button → Register prompt
  - Footer
- **Pattern**: Two-column layout
- **API**: GET `/api/customer/menus`

## Design Patterns to Follow

### 1. Sidebar Navigation (Dashboard Pages)
```html
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">...</div>
  <nav class="sidebar-nav">...</nav>
  <div class="sidebar-footer">...</div>
</aside>
```

### 2. Page Header
```html
<header class="dashboard-header">
  <div class="dashboard-header-left">
    <div class="sidebar-toggle">...</div>
  </div>
  <div class="dashboard-header-right">...</div>
</header>
```

### 3. Content Section
```html
<div class="content-section">
  <div class="section-header">
    <h2 class="section-title">...</h2>
    <div class="section-actions">...</div>
  </div>
  <!-- Content here -->
</div>
```

### 4. Form Pattern
```html
<form id="formId">
  <div class="form-group">
    <label class="form-label">...</label>
    <input class="form-input">
  </div>
  <button class="btn btn-primary">Submit</button>
</form>
```

### 5. Table Pattern
```html
<div class="table-container">
  <table class="table">
    <thead>...</thead>
    <tbody>...</tbody>
  </table>
</div>
```

### 6. Cards Grid
```html
<div class="cards-grid">
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

## JavaScript Patterns to Follow

### API Call Pattern
```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/endpoint');
    const result = await response.json();
    if (result.success) {
      // Handle data
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
}
```

### Form Submission Pattern
```javascript
document.getElementById('formId').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const response = await fetch('/api/endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  if (result.success) {
    alert('Success!');
    window.location.href = '/redirect';
  }
});
```

## CSS Classes to Use

- Layout: `.dashboard-layout`, `.dashboard-main`, `.dashboard-content`
- Cards: `.card`, `.stat-card`, `.menu-card`
- Tables: `.table-container`, `.table`
- Forms: `.form-group`, `.form-label`, `.form-input`
- Buttons: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`
- Badges: `.badge`, `.badge-success`, `.badge-warning`
- Modals: `.modal-overlay`, `.modal`, `.modal-header`, `.modal-body`

## Implementation Priority

### High Priority (Core Functionality)
1. Admin Users Management pages (1-4)
2. Admin Menu pages (5-8)
3. Staff Dashboard and Orders (13-14)
4. Customer Dashboard and Menu (16-17)

### Medium Priority
5. Customer Orders and Bills (18-19)
6. Admin Orders and Feedbacks (9-10)
7. Staff Bills (15)

### Low Priority
8. Customer Feedback (20)
9. Public Menu and Order pages (21-22)
10. Staff Login and Registration (11-12)

## Notes

- All pages should be responsive
- Include error handling in all API calls
- Show loading states during API calls
- Use consistent error messages
- Add success feedback after actions
- Include confirmation modals for delete actions
- Use the established color palette
- Follow accessibility guidelines
- Test on different screen sizes
- Ensure dark mode compatibility

---

**Total Pages**: 22
**Completed**: 3
**Remaining**: 19

Start with high-priority pages to get core functionality working first.
