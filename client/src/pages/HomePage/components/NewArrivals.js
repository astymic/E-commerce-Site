import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewArrivalsProducts } from '../../../redux/actions/productActions';
import ProductCard from '../../../components/common/ProductCard';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

function NewArrivals() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { newArrivalsProducts, loading, error } = productState;

    useEffect(() => {
        dispatch(getNewArrivalsProducts());
    }, [dispatch]);

    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 text-primary-600 font-bold text-sm uppercase tracking-widest mb-4 px-4 py-1 bg-primary-50 rounded-full"
                    >
                        <Sparkles size={16} />
                        <span>Freshly Dropped</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-display font-extrabold text-neutral-900 mb-4">
                        Modern <span className="text-primary-600">Arrivals</span>
                    </h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto">
                        Explore the latest trends and cutting-edge designs. Our new arrivals are curated to keep you ahead of the digital curve.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-neutral-200 aspect-[4/5] rounded-[2rem] mb-4"></div>
                                <div className="h-4 bg-neutral-200 rounded w-2/3 mx-auto"></div>
                            </div>
                        ))}
                    </div>
                ) : error && error.msg ? (
                    <div className="p-12 text-center text-danger border border-danger/20 rounded-[2rem] bg-danger/5">
                        <p>Something went wrong while loading new arrivals.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {newArrivalsProducts.map((product, idx) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default NewArrivals;