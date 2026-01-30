# Modern E-Commerce Marketplace

A full-stack e-commerce application built from scratch using the MERN stack (MongoDB, Express, React, Node.js). This platform includes product management, categorization, user accounts, shopping cart functionality, a full checkout process, and an interactive Admin Panel.

## 🛠 Tech Stack

*   **Frontend:** React.js, Redux (Redux Toolkit), React Router, Axios, p5.js, CSS3.
*   **Backend:** Node.js, Express.js.
*   **Database:** MongoDB (using Mongoose).
*   **Authentication:** JWT (JSON Web Tokens).
*   **File Storage:** Local server storage (Multer).

---

## 📋 Prerequisites

Before launching the project, ensure you have the following installed on your machine:

1.  **Node.js & npm:** (LTS version recommended). [Download Here](https://nodejs.org/)
2.  **Git:** [Download Here](https://git-scm.com/)
3.  **MongoDB:** The database required to run the application.

### 💾 Database Setup (MongoDB)

This project uses **MongoDB** as its database. You have two options for setting this up, but for local development, **MongoDB Community Server** is recommended.

#### Option 1: Local Installation (Recommended)
1.  **Download:** Go to the [MongoDB Community Server Download page](https://www.mongodb.com/try/download/community).
2.  **Install:** Run the installer.
    *   *Windows users:* Keep "Install MongoD as a Service" checked. This ensures the database runs automatically in the background.
    *   *Mac users:* You can use Homebrew: `brew tap mongodb/brew` then `brew install mongodb-community`.
3.  **Verify:** Open your terminal and type `mongod --version`.
4.  **GUI Tool:** It is highly recommended to install **MongoDB Compass** (often comes with the installer). This allows you to visually view your database, create collections, and edit data (useful for manually setting user roles).

**Default Connection String:** `mongodb://localhost:27017/e_commerce_db`

---

## 🚀 Launch Cycle (Installation & Setup)

Follow these steps to get the project running locally from scratch.

### 1. Clone the Repository
Open your terminal/command prompt and navigate to your desired folder.
```bash
git clone https://github.com/astymic/E-commerce-Site.git
cd E-commerce-Site
```

### 2. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install backend dependencies:
    ```bash
    npm install
    ```
3.  **Configuration:**
    Open the file `server/config/default.json`. Ensure the configuration matches your local setup:
    ```json
    {
      "mongoURI": "mongodb://localhost:27017/e_commerce_db",
      "jwtSecret": "CHANGE_THIS_TO_A_LONG_RANDOM_STRING",
      "BASE_URL": "http://localhost:5000"
    }
    ```
    *   *Note:* If you installed MongoDB with default settings, the `mongoURI` above is correct.

4.  Start the Backend Server:
    ```bash
    npm start
    ```
    *   *Expected Output:* `Server is running on port 5000` followed by `MongoDB Connected...`.
    *   **Keep this terminal window open.**

### 3. Frontend Setup
1.  Open a **NEW** terminal window (do not close the backend).
2.  Navigate to the client directory:
    ```bash
    cd client
    ```
3.  Install frontend dependencies:
    ```bash
    npm install
    ```
    *   *Note:* Ensure your `client/package.json` contains the line `"proxy": "http://localhost:5000"`.

4.  Start the Frontend Client:
    ```bash
    npm start
    ```
    *   This will launch the application in your default browser at `http://localhost:3000`.

---

## 👥 Setting up an Admin User

To access the Admin Panel (`/admin`), you need a user with the role of `admin`.

1.  Register a new user via the website's registration page (`http://localhost:3000/register`).
2.  Open **MongoDB Compass**.
3.  Connect to `mongodb://localhost:27017`.
4.  Navigate to `e_commerce_db` -> `users` collection.
5.  Find the user you just created.
6.  Edit the document: Change the field `role` from `"user"` to `"admin"`.
7.  Click "Update".
8.  Log out and log back in on the website. You can now access the Admin Dashboard.

---

## 📂 Project Structure

```
├── client/                 # React Frontend
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Application pages (Home, Product, Cart, Admin)
│       ├── p5-sketches/    # p5.js animations
│       ├── redux/          # State management (Actions, Reducers)
│       └── ...
└── server/                 # Node/Express Backend
    ├── config/             # DB Connection & keys
    ├── controllers/        # Route logic
    ├── middleware/         # Auth & upload middleware
    ├── models/             # Mongoose DB Schemas
    ├── routes/             # API Endpoints
    └── uploads/            # Product image storage
```

## ✨ Features

*   **User:** Browse categories, filter/search products, add to cart, checkout (mock payment), manage profile/addresses, view order history.
*   **Admin:** Dashboard overview, add/edit/delete products and categories, manage orders (status updates), manage users (role assignment).
*   **General:** Responsive design, animated backgrounds (p5.js), JWT Authentication.
