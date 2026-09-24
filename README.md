# 🛒 Full-Stack E-Commerce Platform

A full-stack e-commerce web application built using **React, Node.js, Express, and MongoDB**. It provides a complete online shopping experience with authentication, product browsing, cart management, checkout, order tracking, and role-based administration.


## ✨ Features

### 👤 Customer

- User registration and login
- JWT-based authentication
- Browse and search products
- Filter by category and brand
- View product details and stock
- Add, update, and remove cart items
- Checkout and place orders
- View order history and details
- Track order status
- Manage profile

### 👨‍💼 Admin

- Role-based Admin/User access
- Admin dashboard and statistics
- Product CRUD operations
- Category management
- Brand management
- User management
- View customer orders
- View order details
- Update order status

### ⚙️ Backend

- RESTful APIs
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Protected routes
- Role-based authorization
- CORS
- Helmet security
- API rate limiting
- Morgan request logging

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express.js |
| Authentication | JWT, bcrypt |
| Database | MongoDB, Mongoose |
| Security | Helmet, CORS, Express Rate Limit |
| Deployment | Vercel, Render, MongoDB Atlas |

---

## 🏗️ System Architecture

```text
Customer / Admin
       │
       ▼
React + Vite Frontend
       │
       │ REST API / HTTPS
       ▼
Node.js + Express Backend
       │
       ├── Authentication
       ├── Products
       ├── Cart
       ├── Orders
       └── Admin
       │
       ▼
MongoDB Database
```

---

# 👤 Customer Workflow

```text
Customer
   │
   ▼
Register / Login
   │
   ▼
JWT Authentication
   │
   ▼
Browse Products
   │
   ├── Search
   ├── Category Filter
   └── Brand Filter
   │
   ▼
Product Details
   │
   ▼
Add to Cart
   │
   ▼
View / Update Cart
   │
   ▼
Checkout
   │
   ▼
Place Order
   │
   ▼
Order History
   │
   ▼
Track Order
   │
   ▼
Delivered
```

---

# 👨‍💼 Admin Workflow

```text
Admin
  │
  ▼
Admin Login
  │
  ▼
JWT Authentication
  │
  ▼
Admin Role Authorization
  │
  ▼
Admin Dashboard
  │
  ├── Products
  │     ├── Add
  │     ├── Edit
  │     └── Delete
  │
  ├── Categories
  │     ├── Add
  │     ├── Edit
  │     └── Delete
  │
  ├── Brands
  │     ├── Add
  │     ├── Edit
  │     └── Delete
  │
  ├── Users
  │     └── Manage Users
  │
  └── Orders
        ├── View Orders
        ├── View Details
        └── Update Status
```

---

# 🔄 Complete System Workflow

```text
                 ┌───────────┐
                 │ CUSTOMER  │
                 └─────┬─────┘
                       │
                       ▼
                 React Frontend
                       │
                       │
                       ▼
                 REST API
                       │
                       ▼
              Express + Node.js
                       │
                       ▼
                    MongoDB
                       ▲
                       │
              Express + Node.js
                       ▲
                       │
                 REST API
                       ▲
                       │
                Admin Dashboard
                       ▲
                       │
                 ┌─────┴─────┐
                 │   ADMIN   │
                 └───────────┘
```

### Dynamic Admin-to-Customer Flow

```text
Admin Changes Product / Category / Brand
                │
                ▼
           REST API
                │
                ▼
             MongoDB
                │
                ▼
        Updated Catalog Data
                │
                ▼
        Customer Application
```

---

# 📦 Order Tracking

```text
Place Order
    │
    ▼
 Pending
    │
    ▼
Processing
    │
    ▼
 Shipped
    │
    ▼
Delivered
```

Admins can update order status, while customers can view the latest status from their orders.

---

# 📁 Project Structure

```text
ECommerce-Platform/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       │   └── admin/
│       ├── api.js
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   └── src/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       ├── seed.js
│       └── server.js
│
├── .gitignore
└── README.md
```

---

# 🚀 Run Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

# 🔐 Environment Variables

### Backend

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ Never commit `.env` files, database credentials, passwords, JWT secrets, or API keys to GitHub.

---

# 🌍 Deployment

```text
User
 │
 ▼
Vercel
React Frontend
 │
 │ HTTPS / REST API
 ▼
Render
Node.js + Express Backend
 │
 ▼
MongoDB Atlas
Database
```

**Frontend:** Vercel  
**Backend:** Render  
**Database:** MongoDB Atlas

---

# 📌 Project Highlights

- Full-stack MERN application
- Secure authentication and authorization
- Role-based Admin/User access
- Dynamic product catalog
- Product search and filtering
- Shopping cart and checkout
- Order management and tracking
- Admin dashboard
- Product, category, and brand management
- User management
- RESTful APIs
- MongoDB integration
- Cloud deployment

---

# 🎯 Project Purpose

Developed as a practical **full-stack development and internship project** to demonstrate real-world experience with frontend development, backend APIs, authentication, database integration, CRUD operations, role-based access control, e-commerce workflows, and cloud deployment.

---

#

Full-Stack Developer

**React • Node.js • Express • MongoDB • JavaScript • Tailwind CSS**

---

