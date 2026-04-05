
# Finance Data Processing and Access Control Backend

## 📌 Overview
This project is a backend system for a finance dashboard where users interact with financial records based on role-based permissions. It demonstrates API design, data modeling, access control, and business logic implementation.

---

## 🚀 Features

- User Authentication using JWT
- Role-Based Access Control (Viewer, Analyst, Admin)
- Financial Records CRUD operations
- Filtering records (by type, category, date)
- Dashboard summary APIs (income, expenses, trends)
- Input validation and error handling
- Data persistence using MongoDB (Atlas)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Express Validator

---


## 🌐 Live Demo

The API is deployed and accessible at:

```bash
https://finance-data-processing-backend-si6w.onrender.com
```


> Note:
> - Some endpoints require POST requests and cannot be accessed directly via browser.
> - Use Postman or any API client to test endpoints.
> - The free Render instance may take a few seconds to wake up on first request.

---



## 📂 Project Structure
finance-backend/

├── controllers/

├── models/

├── routes/

├── middleware/

├── validators/

├── config/

├── output_screenshot/

├── app.js

├── package.json

├── README.md

└── .gitignore


---

## ⚙️ Setup Instructions

### 1. Clone repository
```bash
git clone https://github.com/LAKAVATHRAGHURAM/finance-data-processing-backend.git

cd finance-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables
```bash
Create a `.env` file:
```

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm run dev
```

---

## 🔐 Roles and Access Control

### Viewer
- Can view financial records
- Can access dashboard summary
- Cannot create/update/delete records

### Analyst
- Can view financial records
- Can access dashboard insights
- Cannot create/update/delete records

### Admin
- Full access
- Can create, update, delete records
- Can manage users
- Can access dashboard

---

## 📡 API Endpoints

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`

### Financial Records
- POST `/api/records`
- GET `/api/records`
- PUT `/api/records/:id`
- DELETE `/api/records/:id`

### Dashboard
- GET `/api/dashboard/summary`

---

## 📊 Dashboard Features

- Total Income
- Total Expenses
- Net Balance
- Category-wise totals
- Monthly trends
- Recent activity

---

## 📸 Screenshots

Screenshots of API testing are included in the `output_screenshot` folder:

- Register API
- Login API
- Create Record
- Get Records
- Dashboard Summary
- Role-based access tests
- render register
- render summary
- render register already exist

---

## 📌 Assumptions

- JWT is used for authentication
- Only active users can access the system
- MongoDB Atlas is used for database
- Soft delete is used for records
- APIs are tested locally using Postman

---

## ⚠️ Limitations

- No refresh token mechanism
- No rate limiting
- No automated tests
- Not production-ready (assessment purpose)

---



## 👨‍💻 Author

PARANJI PUNITH KUMAR



