# 💎 LuxeStore: High-End E-Commerce Platform

Welcome to **LuxeStore**, a state-of-the-art, full-stack e-commerce marketplace designed with 💎 **Premium UI aesthetics**, ⚡ **Instant-feel performance**, and 🛠️ **Powerful management tools**. 

Built with the **MERN** stack, LuxeStore provides a seamless journey from browsing exclusive assets to a polished checkout experience, all wrapped in a modern, glassmorphic design.

---

## ✨ Premium Features

### 🛍️ Shopping Experience
- **Fluid Navigation**: Subtle sticky header with "backlight" effects and glassmorphism.
- **Smart Shopping Bag**: Instant-preview dropdown with "Ghost Refresh" quantity updates and click-outside closure.
- **Discount Intelligent Logic**: Automatic price adjustments and transparent discount visibility across the bag and checkout.
- **Modern Product Viewing**: 16:9 high-fidelity image galleries with smooth entrance animations.
- **Wishlist & Sorting**: Curated filtering and a layered heart-animation wishlist system.

### 🛠️ Admin Control Center
- **Dynamic Dashboard**: Interactive data tables for managing products, categories, and users.
- **Advanced Order Management**: Real-time status tracking and detailed logistics overview.
- **Bulk Data Import**: Intelligent JSON-based utility for mass product and category migration.
- **Multi-Image Uploads**: Streamlined product creation with support for multiple high-resolution assets.

### ⚡ Performance & Polish
- **Ghost Refresh Pattern**: Non-blocking background updates for quantities and totals—no more disruptive spinners.
- **Glassmorphic UI**: A consistent, state-of-the-art design system using modern CSS and Framer Motion.
- **Animated Atmosphere**: Interactive p5.js backgrounds providing a unique, alive feel.

---

## � Tech Stack

- **Frontend**: React 18, Redux (Toolkit), Framer Motion, Lucide React, Axios, p5.js.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Security**: JWT Authentication & Joi Validation.

---

## � Installation & Setup

### 📋 Prerequisites
1.  **Node.js & npm**: [Download Here](https://nodejs.org/)
2.  **Git**: [Download Here](https://git-scm.com/)
3.  **MongoDB**: The database engine (see details below).

### 💾 Database Setup (MongoDB)

LuxeStore requires **MongoDB**. For local development, we recommend **MongoDB Community Server**.

#### Option 1: Local Installation (Recommended)
1.  **Download**: [MongoDB Community Server Download](https://www.mongodb.com/try/download/community).
2.  **Install**: Follow the installer prompts. 
    - *Windows:* Ensure "Install MongoD as a Service" is checked.
    - *Mac:* Install via Homebrew: `brew tap mongodb/brew` && `brew install mongodb-community`.
3.  **Verify**: Run `mongod --version` in your terminal.
4.  **GUI Tool**: It is highly recommended to use **MongoDB Compass** for visual data management and role assignment.

**Default Connection String**: `mongodb://localhost:27017/e_commerce_db`

---

## �️ Getting Started

### 1. Clone & Dependencies
```bash
git clone https://github.com/astymic/E-commerce-Site.git
cd E-commerce-Site
```

### 2. Backend Configuration
1.  `cd server`
2.  `npm install`
3.  Update `server/config/default.json` with your `mongoURI` and a secure `jwtSecret`.
4.  `npm start` (Runs on port 5000).

### 3. Frontend Launch
1.  (In a new terminal) `cd client`
2.  `npm install`
3.  `npm start` (Runs on port 3000).

---

## 👥 Setting up the Admin Role

1.  Register a new account at `/register`.
2.  Open **MongoDB Compass** and connect to your local DB.
3.  In the `users` collection, find your account and change the `role` field from `"user"` to `"admin"`.
4.  Log out and log back in to access the **Control Center**.

---

## 📂 Project Architecture

```
├── client/                 # React State & UI
│   ├── src/
│   │   ├── components/     # Reusable Atomic Elements
│   │   ├── pages/          # Layouts (Home, Shop, Admin)
│   │   ├── redux/          # Global Context & Actions
│   │   └── animations/     # p5.js & Motion Sketches
└── server/                 # Logic & Data
    ├── controllers/        # Business Logic
    ├── models/             # Data Blueprints
    └── routes/             # API Gateway
```

---

<p align="center">
  <b>Built with Passion for Digital Excellence.</b>
</p>
