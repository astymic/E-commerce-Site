import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import '../AdminPanel.css';

function AdminLayout() {
    return (
        <div className="admin-panel container">
            <h1>Admin Panel</h1>
            <div className="admin-content-area">
                <aside className="admin-sidebar">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}> 
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/products" className={({ isActive }) => (isActive ? 'active' : '')}> 
                                    Manage Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/categories" className={({ isActive }) => (isActive ? 'active' : '')}> 
                                    Manage Categories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? 'active' : '')}> 
                                    Manage Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'active' : '')}> 
                                    Manage Users
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="admin-main-content">
                    <Outlet /> { /* Child routes will render here */}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;