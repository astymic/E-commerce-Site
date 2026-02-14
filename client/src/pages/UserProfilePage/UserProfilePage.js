import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, logout } from "../../redux/actions/authActions";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, Shield, LogOut } from "lucide-react";

function UserProfilePage() {
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated && !user && !loading) {
            dispatch(loadUser());
        }
    }, [dispatch, isAuthenticated, user, loading]);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (loading || !user) {
        return (
            <div className="text-center">
                <div className="animate-pulse space-y-8 max-w-2xl mx-auto">
                    <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto" />
                    <div className="h-8 bg-neutral-200 rounded-xl w-1/3 mx-auto" />
                    <div className="h-40 bg-neutral-200 rounded-3xl" />
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="text-center">
                <div className="bg-white p-12 rounded-[3rem] shadow-premium border border-neutral-100 max-w-md mx-auto">
                    <Shield size={48} className="text-primary-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">Authentication Required</h2>
                    <p className="text-neutral-500 mb-8">Please sign in to access your secure profile dashboard.</p>
                    <Link to="/login" className="btn btn-primary w-full py-4">Sign In Now</Link>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] p-10 md:p-14 shadow-premium border border-neutral-100"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 pb-8 border-b border-neutral-50">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold border-4 border-white shadow-xl">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-extrabold text-neutral-900 mb-1 leading-none italic">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-xs font-bold text-primary-600 uppercase tracking-[0.2em]">Premium Member Since {new Date(user.createdAt || Date.now()).getFullYear()}</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 rounded-2xl text-danger hover:bg-danger/5 transition-all font-bold text-sm border border-danger/10">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <User size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Full Identity</span>
                    </div>
                    <p className="text-lg font-bold text-neutral-900 bg-neutral-50 p-5 rounded-3xl border border-neutral-100/50">
                        {user.firstName} {user.lastName}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <Mail size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Email Access</span>
                    </div>
                    <p className="text-lg font-bold text-neutral-900 bg-neutral-50 p-5 rounded-3xl border border-neutral-100/50">
                        {user.email}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <Phone size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Contact Number</span>
                    </div>
                    <p className="text-lg font-bold text-neutral-900 bg-neutral-50 p-5 rounded-3xl border border-neutral-100/50">
                        {user.phone || 'Private'}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <Shield size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Trust Level</span>
                    </div>
                    <div className="flex items-center gap-3 bg-neutral-50 p-5 rounded-3xl border border-neutral-100/50">
                        <span className="w-3 h-3 bg-success-500 rounded-full animate-pulse" />
                        <p className="text-lg font-bold text-neutral-900">Verified & Active</p>
                    </div>
                </div>
            </div>

            <div className="mt-16 p-10 bg-neutral-900 rounded-[3rem] relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-2xl font-display font-bold text-white mb-2 italic">Exclusive Benefits</h3>
                        <p className="text-neutral-400 max-w-sm text-sm font-medium">As a premium member, you have early access to seasonal drops and specialized curation.</p>
                    </div>
                    <Link to="/" className="bg-primary-600 text-white font-bold px-10 py-5 rounded-full hover:bg-primary-500 transition-all shadow-xl shadow-primary-900/40">
                        Explore Drops
                    </Link>
                </div>
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-[100px] group-hover:bg-primary-600/20 transition-all duration-700" />
            </div>
        </motion.div>
    );
}

export default UserProfilePage;