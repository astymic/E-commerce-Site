import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { User, Package, MapPin, ShieldCheck, Bell, CreditCard } from 'lucide-react';

function UserProfileLayout() {
    const navItems = [
        { to: '/profile', label: 'Personal Info', icon: User, end: true },
        { to: '/profile/orders', label: 'Order History', icon: Package },
        { to: '/profile/addresses', label: 'Saved Addresses', icon: MapPin },
        { to: '/profile/payment', label: 'Payment Methods', icon: CreditCard },
        { to: '/profile/notifications', label: 'Notifications', icon: Bell },
        { to: '/profile/security', label: 'Security', icon: ShieldCheck },
    ];

    return (
        <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
            <div className="container max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Nav */}
                    <aside className="lg:w-72 shrink-0">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-neutral-100 sticky top-32">
                            <h2 className="text-xl font-display font-bold text-neutral-900 mb-8 italic ml-2">Account</h2>
                            <nav>
                                <ul className="space-y-2">
                                    {navItems.map((item) => (
                                        <li key={item.to}>
                                            <NavLink
                                                to={item.to}
                                                end={item.end}
                                                className={({ isActive }) => `
                                                    flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold tracking-wide transition-all group
                                                    ${isActive
                                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                                        : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50'}
                                                `}
                                            >
                                                <item.icon size={18} className="shrink-0" />
                                                <span>{item.label}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default UserProfileLayout;