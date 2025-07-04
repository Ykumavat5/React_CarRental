# 🚘 RideShare Demo Platform

A full-stack demo ride-sharing application built using **React.js** and **Node.js** with three separate web interfaces:

- 🌐 **User Website** – Book and manage rides  
- 🚗 **Driver Website** – Accept rides and track bookings  
- 🛠️ **Admin Panel** – Monitor system and manage users/drivers  

---

## 🧰 Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | React.js, React Router DOM, Axios |
| Backend     | Node.js, Express.js            |
| Database    | MongoDB (with Mongoose)        |
| Authentication | JWT (JSON Web Tokens)       |
| Styling     | Tailwind CSS / Bootstrap       |

---

## 📁 Project Structure

```
rideshare-demo/
│
├── client/                 # Frontend code (React)
│   ├── user/               # User web app
│   ├── driver/             # Driver web app
│   └── admin/              # Admin dashboard
│
├── server/                 # Backend code (Node.js + Express)
│   ├── controllers/        # Business logic
│   ├── routes/             # API endpoints
│   ├── models/             # MongoDB models
│   ├── middleware/         # Auth & error handling
│   └── server.js           # Entry point
│
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/rideshare-demo.git
cd rideshare-demo
```

### 2. Install Dependencies

#### Backend (Node.js)

```bash
cd server
npm install
```

#### Frontend (React)

```bash
cd ../client
npm install
```

### 3. Environment Setup

Create `.env` files in both `/server` and `/client` directories:

#### `/server/.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/rideshare
JWT_SECRET=your_jwt_secret
```

#### `/client/.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🧪 Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend (choose one)

```bash
cd client

# Run User App
npm run user

# Run Driver App
npm run driver

# Run Admin Panel
npm run admin
```

> 📌 You can define these scripts in `client/package.json`:
```json
"scripts": {
  "user": "cd user && npm start",
  "driver": "cd driver && npm start",
  "admin": "cd admin && npm start"
}
```

---

## 📦 API Overview

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | `/api/auth/login`   | Login (User/Driver/Admin)|
| POST   | `/api/auth/register`| Register new user/driver |
| GET    | `/api/rides`        | Get all rides            |
| POST   | `/api/rides/book`   | Book a new ride (User)   |
| PUT    | `/api/rides/:id`    | Update ride (Driver/Admin) |
| GET    | `/api/admin/stats`  | Get dashboard metrics    |

---

## ✅ Features

### 👤 User Website
- Register / Login  
- Book a ride  
- View ride history  
- Track ride status  

### 🚗 Driver Website
- Accept or decline rides  
- View assigned rides  
- Update ride progress  

### 🛡️ Admin Panel
- View/manage users & drivers  
- Monitor ride activity  
- View dashboard analytics  

---

## 🧑‍💻 Contributing

1. Fork the repository  
2. Create a feature branch: `git checkout -b feature/new-feature`  
3. Commit your changes  
4. Push to GitHub  
5. Open a pull request  

---

## 📫 Contact

Developed by Yogesh Kumavat
📧 Email: yogeshkumavat42615@gmail.com  
🌐 GitHub: [https://github.com/Ykumavat5]
