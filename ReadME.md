# 📦 Wholesale Inventory & Sales Management Backend

## Overview
This is the backend for a **Wholesale Inventory & Sales Management System**, built with **Node.js, Express, and MongoDB**.  
It provides RESTful APIs for managing products, vendors, customers, stock purchases, sales, and reports.  

The system includes **user authentication (signup/login)** using **JSON Web Tokens (JWT)** and supports a React frontend running at [http://localhost:5173](http://localhost:5173).

---

## ✨ Features
- **Authentication:** Admin signup and login with JWT-based authentication.
- **Products:** Add, retrieve, update, and delete products with stock tracking.
- **Vendors:** Manage vendor details and track outstanding payments.
- **Customers:** Manage customer details and track outstanding payments.
- **Stock Management:** Record stock purchases with batch numbers and expiry dates.
- **Sales:** Record sales with automatic stock updates and invoice generation.
- **Reports:** Generate sales summaries, profit/loss, best-selling products, and expiry alerts.

---

## 🛠️ Prerequisites
- **Node.js:** v22.17.0 or higher  
- **MongoDB:** Local installation or MongoDB Atlas  
- **npm:** Comes with Node.js  
- **Postman:** (optional) for testing APIs  

---

## 📂 Project Structure
```

wholesale-inventory-backend/
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── server.js              # Entry point
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   ├── User.js            # User schema for authentication
│   ├── Product.js         # Product schema
│   ├── Vendor.js          # Vendor schema
│   ├── Customer.js        # Customer schema
│   ├── Purchase.js        # Purchase schema
│   ├── Sale.js            # Sale schema
│   └── Batch.js           # Batch schema for stock
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── vendorController.js
│   ├── customerController.js
│   ├── stockController.js
│   ├── salesController.js
│   ├── reportController.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── vendorRoutes.js
│   ├── customerRoutes.js
│   ├── stockRoutes.js
│   ├── salesRoutes.js
│   ├── reportRoutes.js
├── middlewares/
│   └── authMiddleware.js  # JWT authentication middleware

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd wholesale-inventory-backend
````

### 2. Install Dependencies

```bash
npm install
```

**Dependencies:**

* express – Web framework
* mongoose – MongoDB ORM
* jsonwebtoken – JWT authentication
* bcryptjs – Password hashing
* cors – Enable CORS for frontend
* dotenv – Load environment variables

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/wholesale_db
JWT_SECRET=your_jwt_secret_here
```

* **PORT:** Server port (default: 5000)
* **MONGO\_URI:** MongoDB connection string (local or Atlas)
* **JWT\_SECRET:** Secure JWT secret key (e.g., `openssl rand -base64 32`)

### 4. Start MongoDB

* **Local:**

  ```bash
  mongod
  ```
* **Atlas:**
  Update `MONGO_URI` with your Atlas connection string.

### 5. Run the Server

```bash
node server.js
```

**Expected Output:**

```
MongoDB connected
Server running on port 5000
```

The backend runs at: [http://localhost:5000](http://localhost:5000)

### 6. Test APIs with Postman

Use the provided collection `Wholesale_Inventory.postman_collection.json`.

---

## 🔑 API Endpoints

### Authentication

* **Signup** – `POST /api/auth/signup`

  ```json
  { "username": "admin3", "email": "admin3@example.com", "password": "password123" }
  ```
* **Login** – `POST /api/auth/login`

  ```json
  { "username": "admin3", "password": "password123" }
  ```

  Response:

  ```json
  { "token": "your_jwt_token" }
  ```

---

### Products

* `POST /api/products` (Protected)
* `GET /api/products` (Protected)
* `PUT /api/products/:id` (Protected)
* `DELETE /api/products/:id` (Protected)

Example body:

```json
{ "name": "Cola", "brand": "Coke", "size": "500ml", "category": "Soft Drinks", "purchasePrice": 50, "sellingPrice": 80 }
```

---

### Vendors

* `POST /api/vendors` (Protected)
* `GET /api/vendors` (Protected)

Example body:

```json
{ "name": "Vendor A", "contact": "123456789", "address": "Street 10", "taxId": "TX1234" }
```

---

### Customers

* `POST /api/customers` (Protected)
* `GET /api/customers` (Protected)

Example body:

```json
{ "shopName": "ABC Store", "contact": "987654321", "address": "Main Market" }
```

---

### Stock

* `POST /api/stock/in` (Protected)

```json
{
  "vendorId": "123",
  "products": [
    { "productId": "456", "quantity": 100, "batchNumber": "B001", "purchasePrice": 45, "expiryDate": "2025-12-31" }
  ],
  "paidAmount": 4000
}
```

---

### Sales

* `POST /api/sales` (Protected)

```json
{
  "customerId": "789",
  "products": [
    { "productId": "456", "quantity": 5 }
  ],
  "discount": 10,
  "paidAmount": 350
}
```

---

### Reports

* **Sales Report:** `GET /api/reports/sales?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
* **Profit/Loss:** `GET /api/reports/profit-loss`
* **Best-Selling:** `GET /api/reports/best-selling`
* **Expiry Alerts:** `GET /api/reports/expiry-alerts`

---

## 🛑 Troubleshooting

### Common Issues

* **CORS Error:** Ensure `cors` is configured in `server.js` to allow `http://localhost:5173`.
* **JWT Error:** Ensure `JWT_SECRET` exists in `.env`.
* **Module Not Found:** Verify `middlewares/authMiddleware.js` path.
* **MongoDB Connection:** Confirm `MONGO_URI` and MongoDB service status.

### Debugging

```js
console.log('JWT_SECRET:', process.env.JWT_SECRET);
```

Check `.env` exists:

```bash
dir .env
```

---

## 🔒 Security Notes

* Use a strong `JWT_SECRET` in production.
* Enforce password rules in `authController.js`.
* Use HTTPS in production.
* Restrict CORS origins in production.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:

   ```bash
   git commit -m "Add feature"
   ```
4. Push to branch:

   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## 📜 License

This project is **unlicensed** and intended for **personal use**.
Contact the repository owner for commercial use.

