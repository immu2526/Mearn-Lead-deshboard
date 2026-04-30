# 📊 Lead Dashboard & Reporting System

A full-stack MERN application for managing leads, visualizing key metrics, and generating filtered reports — built as part of the Acolyte Technologies Technical Interview Task.

🔗 **Live Demo:** [https://mearn-lead-deshboard.vercel.app](https://mearn-lead-deshboard.vercel.app)

---

## 🚀 Features

### ✅ Lead Management
- Add, View, and Update leads
- Fields: Name, Mobile, Email, City, Service, Budget, Status
- Status types: `New` · `Interested` · `Converted` · `Rejected`

### 📈 Dashboard
- Total leads count
- Status-wise breakdown (with charts)
- City-wise distribution (with charts)
- Service-wise distribution (with charts)

### 🔍 Reporting & Filters
- Filter leads by **Date Range**, **City**, **Status**, and **Service**
- Export filtered data as **CSV / Excel**

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | React.js, Chart.js      |
| Backend    | Node.js, Express.js     |
| Database   | MongoDB, Mongoose       |
| Deployment | Vercel (Frontend + Backend) |

---

## 📁 Project Structure

```
Mearn-Lead-deshboard/
├── backend/
│   ├── models/
│   │   └── Lead.js            # Mongoose schema
│   ├── routes/
│   │   └── leads.js           # RESTful API routes
│   ├── controllers/
│   │   └── leadController.js  # Business logic
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── .env                   # Environment variables
│   └── server.js              # Entry point
│
└── frontend/leads/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.jsx   # Charts & metrics
    │   │   ├── LeadForm.jsx    # Add/Edit lead
    │   │   ├── LeadTable.jsx   # View all leads
    │   │   └── Reports.jsx     # Filter & export
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/immu2526/Mearn-Lead-deshboard.git
cd Mearn-Lead-deshboard
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend/leads
npm install
npm run dev
```

The app will run at `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/leads`          | Get all leads            |
| POST   | `/api/leads`          | Add a new lead           |
| PUT    | `/api/leads/:id`      | Update an existing lead  |
| GET    | `/api/leads/stats`    | Dashboard metrics        |
| GET    | `/api/leads/filter`   | Filter leads by criteria |

---

## 🌐 Deployment

- **Frontend** → Deployed on [Vercel](https://vercel.com)
- **Backend** → Deployed on [Vercel / Render]

---

## 📌 Environment Variables

| Variable    | Description                  |
|-------------|------------------------------|
| `MONGO_URI` | MongoDB connection string     |
| `PORT`      | Backend server port (default: 5000) |

---

## 👨‍💻 Author

**Imran** — [GitHub @immu2526](https://github.com/immu2526)

---

## 📄 License

This project is built for interview evaluation purposes.
