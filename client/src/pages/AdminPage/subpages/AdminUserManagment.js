import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUsers, adminUpdateUserRole } from '../../../redux/actions/adminActions';
import { motion } from 'framer-motion';
import { User, Shield, ShieldAlert, Mail, Calendar, UserCheck, MoreVertical, ShieldCheck } from 'lucide-react';

function AdminUserManagment() {
    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(getAdminUsers());
    }, [dispatch]);

    const handleRoleUpdate = (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        const confirmMsg = `Are you sure you want to change this user to ${newRole.toUpperCase()}?`;
        if (window.confirm(confirmMsg)) {
            dispatch(adminUpdateUserRole(userId, newRole));
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-bold text-neutral-900">User Management</h2>
                    <p className="text-neutral-500 font-medium">Control access levels and manage platform administrators</p>
                </div>
                <div className="flex -space-x-3">
                    {users?.slice(0, 5).map((u, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-400">
                            {u.firstName?.[0]}{u.lastName?.[0]}
                        </div>
                    ))}
                    {users?.length > 5 && (
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-50 flex items-center justify-center text-[10px] font-bold text-primary-600">
                            +{users.length - 5}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-premium overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left bg-neutral-50/30">
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">User Identity</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Role Access</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Joined On</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="4" className="px-8 py-6"><div className="h-12 bg-neutral-100 rounded-2xl w-full" /></td>
                                    </tr>
                                ))
                            ) : users && users.length > 0 ? (
                                users.map((user, idx) => (
                                    <motion.tr
                                        key={user._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="hover:bg-neutral-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${user.role === 'admin' ? 'bg-primary-50 text-primary-600' : 'bg-neutral-50 text-neutral-400'}`}>
                                                    {user.role === 'admin' ? <ShieldCheck size={22} /> : <User size={22} />}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-bold text-neutral-900 flex items-center gap-2">
                                                        {user.firstName} {user.lastName}
                                                        {user.role === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
                                                        <Mail size={12} />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${user.role === 'admin' ? 'bg-primary-50 border-primary-100 text-primary-700' : 'bg-white border-neutral-100 text-neutral-500'}`}>
                                                {user.role === 'admin' ? <Shield size={14} /> : <User size={14} />}
                                                <span className="text-[10px] font-bold uppercase tracking-wider italic">{user.role}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-neutral-400 text-sm font-medium">
                                                <Calendar size={14} />
                                                {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button
                                                onClick={() => handleRoleUpdate(user._id, user.role)}
                                                className={`p-2.5 rounded-xl transition-all ${user.role === 'admin' ? 'text-neutral-400 hover:text-danger hover:bg-danger/5' : 'text-primary-400 hover:text-primary-600 hover:bg-primary-50'}`}
                                                title={user.role === 'admin' ? 'Revoke Admin' : 'Grant Admin'}
                                            >
                                                {user.role === 'admin' ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="px-8 py-20 text-center text-neutral-400">No users found in database.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminUserManagment;