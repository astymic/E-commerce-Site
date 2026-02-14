import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthenticated, loading, error } = useSelector(state => state.auth);

    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    const from = location.state?.from?.pathname || "/";
    if (isAuthenticated) return <Navigate to={from} replace />;

    return (
        <div className="pt-32 pb-20 min-h-screen bg-neutral-50 flex items-center justify-center">
            <div className="container max-w-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] p-8 md:p-12 shadow-premium border border-neutral-100"
                >
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <LogIn size={32} />
                        </div>
                        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">Welcome Back</h1>
                        <p className="text-neutral-500 font-medium">Please enter your details to sign in</p>
                    </div>

                    {error && error.msg && error.msg !== 'No token found' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-danger/10 text-danger text-sm font-bold p-4 rounded-2xl border border-danger/20 mb-8 text-center"
                        >
                            {error.msg}
                        </motion.div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    placeholder="your@email.com"
                                    className="input-field pl-12"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    className="input-field pl-12 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <label className="flex items-center text-sm font-medium text-neutral-500 cursor-pointer">
                                <input type="checkbox" className="mr-2 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                                Remember me
                            </label>
                            <Link to="/" className="text-sm font-bold text-primary-600 hover:text-primary-700">Forgot Password?</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full py-4 text-lg shadow-xl shadow-primary-500/25 group"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                            {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-neutral-100 text-center">
                        <p className="text-neutral-500 font-medium mb-4">
                            Don't have an account?
                            <Link to="/register" className="ml-2 text-primary-600 font-bold hover:text-primary-700">Create Account</Link>
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-neutral-400">
                            <ShieldCheck size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Secure Authentication</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default LoginPage;