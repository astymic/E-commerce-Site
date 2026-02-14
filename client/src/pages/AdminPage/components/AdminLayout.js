import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Layers,
    ShoppingBag,
    Users,
    Database,
    ChevronRight
} from 'lucide-react';

function AdminLayout() {
    const navItems = [
        { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/admin/products", label: "Manage Products", icon: Package },
        { to: "/admin/categories", label: "Manage Categories", icon: Layers },
        { to: "/admin/orders", label: "Manage Orders", icon: ShoppingBag },
        { to: "/admin/users", label: "Manage Users", icon: Users },
        { to: "/admin/import", label: "Data Import", icon: Database },
    ];

    return (
        <div className="admin-panel max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-20">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-1.5 h-8 bg-primary-600 rounded-full" />
                <h1 className="text-4xl font-display font-black text-neutral-900 tracking-tight italic">
                    Control <span className="text-primary-600">Center</span>
                </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                <aside className="lg:w-80 shrink-0">
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-premium border border-neutral-100 sticky top-32">
                        <nav>
                            <ul className="space-y-2">
                                {navItems.map((item) => (
                                    <li key={item.to}>
                                        <NavLink
                                            to={item.to}
                                            className={({ isActive }) => `
                                                flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold tracking-wide transition-all group
                                                ${isActive
                                                    ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/20'
                                                    : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50'
                                                }
                                            `}
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <div className="flex items-center gap-4">
                                                        <item.icon size={20} className={isActive ? 'text-white' : 'text-neutral-300 group-hover:text-primary-500 transition-colors'} />
                                                        {item.label}
                                                    </div>
                                                    <ChevronRight size={16} className={`opacity-0 group-hover:opacity-100 transition-all ${isActive ? 'translate-x-1' : ''}`} />
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="mt-10 pt-8 border-t border-neutral-50 px-4">
                            <div className="bg-neutral-900 rounded-3xl p-6 text-white relative overflow-hidden">
                                <p className="text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-2 italic">Pro Version</p>
                                <p className="text-xs font-medium leading-relaxed opacity-80">
                                    Advanced analytics and team management enabled.
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 min-w-0">
                    <div className="bg-white rounded-[3rem] p-6 md:p-8 shadow-premium border border-neutral-100">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;