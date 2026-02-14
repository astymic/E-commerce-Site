import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../../components/common/ProductCard';
import { motion } from 'framer-motion';

function ProductList() {
    const { categoryProducts, loading, error } = useSelector(state => state.product);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="animate-pulse bg-white rounded-[2rem] h-[500px] border border-neutral-100" />
                ))}
            </div>
        );
    }

    if (error && error.msg) {
        return (
            <div className="p-12 text-center bg-danger/5 border border-danger/10 rounded-[2rem] text-danger">
                <p className="font-bold">Error loading products</p>
                <p className="text-sm opacity-80">{error.msg}</p>
            </div>
        );
    }

    return (
        <section>
            {categoryProducts.length === 0 ? (
                <div className="p-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-neutral-100 italic text-neutral-400">
                    No products found in this category.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {categoryProducts.map((product, idx) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (idx % 6) * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ProductList;