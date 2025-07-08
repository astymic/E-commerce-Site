import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector }  from 'react-redux';
import { getProduct } from '../../redux/actions/productActions';
import { addItemToCart } from '../../redux/actions/cartActions';


function ProductPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { product, loading, error } = productState;

    useEffect(() => {
        dispatch(getProduct(productId));
    }, [dispatch, productId]);

    const handleAddToCart = () => {
        if (product && product._id) {
            dispatch(addItemToCart(product._id, 1));
            console.log(`${product.name} added to cart`);
        }
    };

    if (loading || !product) {
        return <div>Loading product details...</div>;
    }

    if (error) {
        console.log("Displaying error message:", error);
        return <div style={{ color: 'red' }}>Error loading product: {error.msg || 'Product not found'}</div>
    }

    return (
        <div className="product-page container">
            <div className="product-main-info">
                <div className="product-images">
                    <img 
                        src={product.images?.[0] || '/placeholder.png'} 
                        alt={product.name}
                        className="main-product-image"
                    />
                </div>

                {/* Product Details Section */}
                <div className="product-details">
                    <h1>{product.name}</h1>
                    <div className="product-rating">Rating: {product.rating?.toFixed(1) || 'N/A'} / 5</div>
                    <p className="product-short-desc">{product.shortDescription || ''}</p>
                    <ul className="condensed-specs">
                        {product.specifications?.slice(0, 3).map((spec, index) => (
                            <li key={index}><strong>{spec.name}:</strong> {spec.value}</li>
                        ))}
                    </ul>
                    <div className="product-price">
                        {product.discountPrice ? (
                            <span><del>${product.price.toFixed(2)}</del> <strong>${product.discountPrice.toFixed(2)}</strong></span>
                        ) : (
                            <span>${product.price.toFixed(2)}</span>
                        )}
                    </div>
                    <button onClick={handleAddToCart} className="btn btn-primary add-to-cart-btn">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Collapsible Section Below */}
            <div className="product-collapsible-sections">
                <div className="tabs">
                    <button className="tab-button active">Full Description</button>
                    <button className="tab-button">Specifications</button>
                    <button className="tab-button">Reviews</button>
                </div>
                <div className="tab-content">
                    <div className="tab-pane active">
                        <h2>Full Description</h2>
                        <p>{product.description}</p>
                    </div>
                    <div className="tab-pane">
                        <h2>Specifications</h2>
                        <ul>
                            {product.specifications?.map((spec, index) => (
                                <li key={index}><strong>{spec.name}:</strong> {spec.value}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="tab-pane">
                        <h2>Reviews</h2>
                        <p>Reviews section coming soon...</p>
                    </div>
                </div>
            </div>

            <section className="similar-products">
                <h2>Similar Products</h2>
                <p>Similar products section coming soon...</p>
            </section>
        </div>
    );
}


export default ProductPage;