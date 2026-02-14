import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/actions/categoryActions';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function CategoryOverview() {
    const dispatch = useDispatch();
    const categorySate = useSelector(state => state.category);
    const { categories, loading, error } = categorySate;

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <section className="py-24 bg-neutral-900 border-t border-neutral-800 overflow-hidden">
            <div className="container">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                        <div className="flex items-center space-x-2 text-primary-500 font-bold text-sm uppercase tracking-widest mb-4">
                            <LayoutGrid size={18} />
                            <span>Browse Collections</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white leading-tight">
                            Shop by <span className="text-primary-500">Category</span>
                        </h2>
                    </div>
                    <p className="text-neutral-400 max-w-sm mb-2">
                        Find exactly what you're looking for by exploring our curated collections of premium digital assets.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse bg-neutral-800 aspect-[16/9] rounded-[2rem]"></div>
                        ))}
                    </div>
                ) : error && error.msg ? (
                    <div className="p-12 text-center text-neutral-500">
                        <p>Unable to load categories.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {categories.map((category, idx) => (
                            <motion.div
                                key={category._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative aspect-[16/10] bg-neutral-800 rounded-[2.5rem] overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={category.image || `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800`}
                                    alt={category.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent z-10" />

                                <div className="absolute bottom-8 left-8 right-8 z-20">
                                    <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                                        {category.name}
                                    </h3>
                                    <div className="flex items-center text-sm font-semibold text-neutral-300 group-hover:text-white transition-all">
                                        <Link to={`/category/${category._id}`} className="flex items-center">
                                            <span>Explore Collection</span>
                                            <ArrowRight className="ml-2 w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default CategoryOverview;