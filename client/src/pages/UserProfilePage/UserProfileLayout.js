import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function UserProfileLayout() {
    return (
        <div className="user-profile-layout container">
            <aside className="profile-sidebar">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/profile" end>My Profile</NavLink>
                            <NavLink to="/profile/orders">Order History</NavLink>
                            <NavLink to="/profile/addresses">Saved Addresses</NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="profile-content">
                <Outlet />
            </main>
        </div>
    );
}

export default UserProfileLayout;