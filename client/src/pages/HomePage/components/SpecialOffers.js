import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotionalProducts } from '../../../redux/actions/productActions';
import ProductCard from '../../../components/common/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function SpecialOffers() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { promotionalProducts, loading, error } = productState;

    useEffect(() => {
        dispatch(getPromotionalProducts());
    }, [dispatch]);

    return (
        <section className="py-24 bg-neutral-50 overflow-hidden">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-b border-neutral-200 pb-8 gap-6">
                    <div>
                        <div className="flex items-center space-x-2 text-primary-600 font-bold text-sm uppercase tracking-wider mb-3">
                            <Sparkles size={18} fill="currentColor" />
                            <span>Don't Miss Out</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-neutral-900">
                            Exclusive <span className="text-primary-600">Special</span> Offers
                        </h2>
                    </div>
                    <p className="text-neutral-500 max-w-md text-sm md:text-right">
                        Handpicked deals just for you. Save big on our most exclusive items for a limited time.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-neutral-200 aspect-[4/5] rounded-[2rem] mb-4"></div>
                                <div className="h-4 bg-neutral-200 rounded w-2/3 mb-2"></div>
                            </div>
                        ))}
                    </div>
                ) : error && error.msg ? (
                    <div className="p-12 text-center text-neutral-400">
                        <p>Unable to load offers at this time.</p>
                    </div>
                ) : promotionalProducts.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-[2rem] border border-dashed border-neutral-300 text-neutral-500">
                        <p>No special offers currently available. Check back soon!</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {promotionalProducts.map((product, idx) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-16 text-center">
                    <button className="btn btn-secondary border-neutral-300 px-10">
                        View All Offers
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default SpecialOffers;