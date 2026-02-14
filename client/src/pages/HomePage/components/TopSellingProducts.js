import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopSellingProducts } from '../../../redux/actions/productActions';
import ProductCard from '../../../components/common/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

function TopSellingProducts() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { topSellingProducts, loading, error } = productState;

    useEffect(() => {
        dispatch(getTopSellingProducts());
    }, [dispatch]);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <div className="flex items-center space-x-2 text-accent-600 font-bold text-sm uppercase tracking-wider mb-3">
                            <Flame size={18} fill="currentColor" />
                            <span>Hot Deals</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 leading-tight">
                            Most Wanted Masterpieces
                        </h2>
                    </div>
                    <button className="group flex items-center space-x-2 text-primary-600 font-bold hover:text-primary-700 transition-colors">
                        <span>Explore All Hot Items</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-neutral-200 aspect-[4/5] rounded-3xl mb-4"></div>
                                <div className="h-4 bg-neutral-200 rounded w-2/3 mb-2"></div>
                                <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                ) : error && error.msg ? (
                    <div className="bg-danger/10 text-danger p-6 rounded-2xl border border-danger/20 flex flex-col items-center">
                        <p className="font-semibold mb-2">Error loading products</p>
                        <p className="text-sm opacity-80">{error.msg}</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'
                    >
                        {topSellingProducts.map((product, idx) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default TopSellingProducts;