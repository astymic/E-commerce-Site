import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, ChevronRight, Package } from 'lucide-react';

function CategoriesPage() {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                            <Layers size={24} />
                        </div>
                        <div>
                            <h2 className="text-4xl font-display font-black text-neutral-900 tracking-tight italic">
                                Our <span className="text-primary-600">Categories</span>
                            </h2>
                            <p className="text-neutral-500 font-medium">Explore products by their collections</p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-[2.5rem] h-[200px] border border-neutral-100" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="p-20 text-center bg-white rounded-[3rem] border border-neutral-100 shadow-premium">
                        <p className="text-danger font-bold text-xl mb-2">Oops! Something went wrong.</p>
                        <p className="text-neutral-500">{error.msg || 'Could not load categories'}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category, idx) => (
                            <motion.div
                                key={category._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    to={`/category/${category._id}`}
                                    className="block group bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-premium hover:shadow-2xl hover:border-primary-100 transition-all text-center relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform" />

                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="w-20 h-20 bg-primary-600 rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-primary-500/20 mb-6 group-hover:-translate-y-2 transition-transform">
                                            <Package size={32} />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">{category.name}</h3>
                                        <p className="text-neutral-400 text-sm font-medium mb-6 line-clamp-2">{category.description || 'Browse our curated collection'}</p>
                                        <div className="flex items-center gap-2 text-primary-600 font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                                            View Products
                                            <ChevronRight size={18} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoriesPage;
