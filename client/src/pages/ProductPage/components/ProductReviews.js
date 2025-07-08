import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductReview } from "../../../redux/actions/productActions";


function ProductReviews({ productId, reviews }) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    const { reviewError } = useSelector(state => state.product);

    const [rating, setRating] = useState(5); // Default rating
    const [comment, setComment] = useState('');
    const [localError, setLocalError] = useState('');

    useEffect(() => {
        if (reviewError && reviewError.errors) {
            setLocalError(reviewError.errors[0].msg);
        } else {
            setLocalError('');
        }
    }, [reviewError]);

    const handleSubmitReview = (e) => {
        e.preventDefault();
        setLocalError('');
        dispatch(addProductReview(productId, { rating, comment }));
    };

    return (
        <div className="review-section">
            <h3>Customer Reviews</h3>
            {isAuthenticated ? (
                <form onSubmit={handleSubmitReview} className="review-form">
                    <h4>Write a Review</h4>
                    {localError && <p style={{color: 'red'}}>{localError}</p>}
                    <div>
                        <label>Rating:</label>
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Very Good</option>
                            <option value="3">3 - Good</option>
                            <option value="2">2 - Fair</option>
                            <option value="1">1 - Poor</option>
                        </select>
                    </div>
                    <div>
                        <label>Comment:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} 
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
            ) : (
                <p>Please log in to write a review.</p>
            )}

            <div className="existing-reviews">
                {reviews && reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review._id} className="review-item">
                            <strong>{review.username}</strong>
                            <span> - {new Date(review.date).toLocaleDateString()}</span>
                            <div className="review-rating">Rating: {review.rating}/5</div>
                            <p>{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review this product!</p>
                )}
            </div>
        </div>
    );
}

export default ProductReviews;