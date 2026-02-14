import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getSimilarProducts } from '../../redux/actions/productActions';
import { addItemToCart } from '../../redux/actions/cartActions';
import ProductReviews from './components/ProductReviews';
import ProductCard from '../../components/common/ProductCard';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Share2, Heart } from 'lucide-react';

function ProductPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { product, similarProducts, loading, error } = productState;

    const [activeTab, setActiveTab] = useState('description');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        dispatch(getProduct(productId));
        dispatch(getSimilarProducts(productId));
    }, [dispatch, productId]);

    const handleAddToCart = () => {
        if (product && product._id) {
            dispatch(addItemToCart(product._id, 1));
        }
    };

    if (loading || !product) {
        return <LoadingSpinner message="Elevating your experience..." />;
    }

    if (error) {
        return (
            <div className="container py-20 text-center">
                <div className="bg-danger/10 text-danger p-8 rounded-3xl border border-danger/20 inline-block">
                    <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
                    <p className="opacity-80">The item you are looking for might have been moved or removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 bg-neutral-50 min-h-screen relative">
            {/* Image Zoom Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-neutral-900/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-7xl w-full h-full flex items-center justify-center"
                        >
                            <img
                                src={selectedImage}
                                alt="Zoomed Product"
                                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                            />
                            <button
                                className="absolute top-0 right-0 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                                onClick={() => setSelectedImage(null)}
                            >
                                <Share2 size={24} className="rotate-45" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container">
                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    {/* Left: Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-[3rem] p-8 shadow-premium border border-neutral-100"
                    >
                        <Carousel
                            showArrows={true}
                            showStatus={false}
                            infiniteLoop={true}
                            useKeyboardArrows={true}
                            autoPlay={false}
                            thumbWidth={100}
                            className="product-carousel"
                        >
                            {product.images && product.images.length > 0 ? (
                                product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-video rounded-2xl overflow-hidden cursor-zoom-in group"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} - ${index + 1}`}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="aspect-video rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center">
                                    <img src="/placeholder.png" alt="Placeholder" className="w-1/4 opacity-20" />
                                </div>
                            )}
                        </Carousel>
                    </motion.div>

                    {/* Right: Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-primary-100 text-primary-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                    {product.category?.name || "Premium Asset"}
                                </span>
                                <div className="flex items-center gap-1 text-sm font-bold text-neutral-800 bg-white px-3 py-1 rounded-full shadow-sm border border-neutral-100">
                                    <Star size={14} className="fill-accent-500 text-accent-500" />
                                    <span>{product.rating?.toFixed(1) || '4.8'}</span>
                                    <span className="text-neutral-400 font-medium">({product.reviews?.length || 0})</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-neutral-900 mb-6 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-4 mb-8">
                                {product.discountPrice ? (
                                    <>
                                        <span className="text-4xl font-bold text-primary-600">${product.discountPrice.toFixed(2)}</span>
                                        <span className="text-xl text-neutral-400 line-through font-medium">${product.price.toFixed(2)}</span>
                                        <span className="bg-accent-100 text-accent-700 text-xs font-bold px-2 py-1 rounded-lg italic">
                                            Save {(100 - (product.discountPrice / product.price * 100)).toFixed(0)}%
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-4xl font-bold text-neutral-900">${product.price.toFixed(2)}</span>
                                )}
                            </div>

                            <p className="text-neutral-500 text-lg leading-relaxed mb-8">
                                {product.shortDescription || product.description?.substring(0, 200) + '...'}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <button
                                onClick={handleAddToCart}
                                className="btn btn-primary flex-1 py-4 text-lg shadow-xl shadow-primary-500/25 group"
                            >
                                <ShoppingCart className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
                                Add to Cart
                            </button>
                            <button className="btn btn-secondary p-4 px-6 border-neutral-200">
                                <Heart size={24} className="text-neutral-400 hover:text-accent-500 transition-colors" />
                            </button>
                            <button className="btn btn-secondary p-4 px-6 border-neutral-200">
                                <Share2 size={24} className="text-neutral-400" />
                            </button>
                        </div>

                        {/* Benefits Icons */}
                        <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm mt-auto">
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheck size={24} className="text-primary-500" />
                                <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-tighter">Verified Quality</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2 border-x border-neutral-100">
                                <Truck size={24} className="text-primary-500" />
                                <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-tighter">Fast Delivery</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <RotateCcw size={24} className="text-primary-500" />
                                <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-tighter">30 Day Returns</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Details/Reviews Tabs */}
                <div className="bg-white rounded-[3rem] p-10 shadow-premium border border-neutral-100 mb-20">
                    <div className="flex border-b border-neutral-100 mb-10 pb-1">
                        {['description', 'specifications', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-primary-600' : 'text-neutral-400 hover:text-neutral-600'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-full"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'description' && (
                                <div className="prose prose-neutral max-w-none">
                                    <p className="text-neutral-600 leading-relaxed text-lg">{product.description}</p>
                                </div>
                            )}
                            {activeTab === 'specifications' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                    {product.specifications?.map((spec, index) => (
                                        <div key={index} className="flex justify-between py-4 border-b border-dotted border-neutral-200">
                                            <span className="font-bold text-neutral-500 uppercase text-xs tracking-wider">{spec.name}</span>
                                            <span className="font-semibold text-neutral-900">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <ProductReviews productId={product._id} reviews={product.reviews} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Similar Products */}
                <section>
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-display font-bold text-neutral-900 tracking-tight">You Might Also Like</h2>
                    </div>
                    {similarProducts && similarProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {similarProducts.map((p, idx) => (
                                <motion.div
                                    key={p._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <ProductCard product={p} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-neutral-200 text-neutral-400 font-medium">
                            No related products at the moment.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default ProductPage;