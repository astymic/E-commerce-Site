import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductReview } from "../../../redux/actions/productActions";
import { Star, MessageSquarePlus, User, Calendar, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ProductReviews({ productId, reviews }) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    const { reviewError } = useSelector(state => state.product);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [localError, setLocalError] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        if (reviewError?.errors) {
            setLocalError(reviewError.errors[0].msg);
        } else {
            setLocalError('');
        }
    }, [reviewError]);

    const handleSubmitReview = (e) => {
        e.preventDefault();
        setLocalError('');
        dispatch(addProductReview(productId, { rating, comment }));
        if (!reviewError) {
            setComment('');
            setIsFormOpen(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-neutral-50 pb-8">
                <div>
                    <h3 className="text-2xl font-display font-bold text-neutral-900 mb-1 italic">Customer Voice</h3>
                    <p className="text-sm text-neutral-400 font-medium">Real experiences from our community</p>
                </div>

                {isAuthenticated ? (
                    <button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="btn btn-primary px-8 py-3 text-sm shadow-lg shadow-primary-500/20"
                    >
                        <MessageSquarePlus size={18} className="mr-2" />
                        {isFormOpen ? 'Cancel Review' : 'Write a Review'}
                    </button>
                ) : (
                    <div className="bg-neutral-50 px-6 py-3 rounded-full border border-neutral-100 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                        Sign in to review
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <form onSubmit={handleSubmitReview} className="bg-neutral-50 p-8 rounded-[2.5rem] border border-neutral-100 space-y-6">
                            <h4 className="text-lg font-bold text-neutral-900">Share your experience</h4>

                            {localError && (
                                <div className="p-4 bg-danger/10 text-danger text-xs font-bold rounded-xl border border-danger/20">
                                    {localError}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Your Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="transition-transform active:scale-90"
                                        >
                                            <Star
                                                size={32}
                                                className={`transition-colors ${star <= rating ? 'fill-accent-500 text-accent-500' : 'text-neutral-200'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Your Thoughts</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tell us what you liked (or didn't)..."
                                    className="input-field min-h-[120px] py-4 resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary w-full py-4 text-lg">
                                Publish Review
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews?.length > 0 ? (
                    reviews.map((review, idx) => (
                        <motion.div
                            key={review._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-neutral-900">{review.username || 'Verified Client'}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-bold uppercase tracking-tighter">
                                            <Calendar size={12} />
                                            <span>{new Date(review.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={i < review.rating ? 'fill-accent-500 text-accent-500' : 'text-neutral-100'} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 italic">
                                "{review.comment}"
                            </p>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-neutral-50 rounded-[3rem] border-2 border-dashed border-neutral-100 text-center flex flex-col items-center gap-4">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-neutral-300">
                            <Star size={40} className="fill-current" />
                        </div>
                        <p className="text-neutral-400 font-medium font-display">No reviews yet. Be the first to share your voice!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductReviews;