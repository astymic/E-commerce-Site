import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import ProductCard from '../../components/common/ProductCard';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';

function ShopPage() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // Handle both array and object formats if necessary
    const productList = Array.isArray(products) ? products : products?.products || [];

    return (
        <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <h2 className="text-4xl font-display font-black text-neutral-900 tracking-tight italic">
                                The <span className="text-primary-600">Shop</span>
                            </h2>
                            <p className="text-neutral-500 font-medium">Browse our entire premium collection</p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-[2.5rem] h-[500px] border border-neutral-100" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="p-20 text-center bg-white rounded-[3rem] border border-neutral-100 shadow-premium">
                        <p className="text-danger font-bold text-xl mb-2">Oops! Something went wrong.</p>
                        <p className="text-neutral-500">{error.msg || 'Could not load products'}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {productList.map((product, idx) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (idx % 8) * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShopPage;
