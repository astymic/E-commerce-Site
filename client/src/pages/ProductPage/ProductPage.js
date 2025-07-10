import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector }  from 'react-redux';
import { getProduct, getSimilarProducts } from '../../redux/actions/productActions';
import { addItemToCart } from '../../redux/actions/cartActions';
import ProductReviews from './components/ProductReviews';
import ProductCard from '../../components/common/ProductCard';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


function ProductPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { product, similarProducts, loading, error } = productState;

    const [activeTab, setActiveTab] = useState('descrtiption'); // 'description', 'specs' or 'reviews' 

    useEffect(() => {
        dispatch(getProduct(productId));
        dispatch(getSimilarProducts(productId));
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
        return <div style={{ color: 'red' }}>Error: {error.errors?.[0]?.msg || 'Product not found'}</div>
    }

    return (
        <div className="product-page container">
            <div className="product-main-info">
                <div className="product-images">
                    <Carousel
                        showArrows={true}
                        showStatus={false}
                        infiniteLoop={true}
                        useKeyboardArrows={true}
                        autoPlay={true}
                        interval={5000}
                        thumbWidth={80}
                    >
                        {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={`${product.name} - view ${index + 1}`} />
                                </div>
                            ))
                        ) : (
                            <div>
                                <img src="/placeholder.png" alt="No product image available" />
                            </div>
                        )}
                    </Carousel>
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
                    {/* Tab buttons that update the activeTab state on click */}
                    <button 
                        className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => setActiveTab('description')}
                    >
                        Full Description
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'specs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('specs')}
                    >
                        Specifications
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === 'description' && (
                        <div className="tab-pane active">
                            <h2>Full Description</h2>
                            <p>{product.description}</p>
                        </div>                        
                    )}
                    {activeTab === 'specs' && (
                        <div className="tab-pane active">
                            <h2>Specifications</h2>
                            <ul className='full-specs-list'>
                                {product.specifications?.map((spec, index) => (
                                    <li key={index}><strong>{spec.name}:</strong> {spec.value}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div className="tab-pane active">
                            <h2>Reviews</h2>
                            <ProductReviews productId={product._id} reviews={product.reviews} />
                        </div>
                    )}
                </div>
            </div>

            {/* Similar Products Section */}
            <section className="similar-products">
                <h2>Similar Products</h2>
                <div className="product-grid">
                    {similarProducts && similarProducts.length > 0 ? (
                        similarProducts.map(p => (
                            <ProductCard key={p._id} product={p} />
                        ))
                    ) : (
                        <p>No similar products found.</p>
                    )}
                </div>
            </section>
        </div>
    );
}


export default ProductPage;