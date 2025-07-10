import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../../../redux/actions/productActions"; // Temporary
import { adminCreateProduct, adminUpdateProduct } from "../../../redux/actions/adminActions";

function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const { product, loading, error } = useSelector(state => state.product);
    const { categories } = useSelector(state => state.category)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        shortDescription: '',
        price: '',
        discountPrice: '',
        category: '',
        stock: '',
        isPromotion: false,
        isNew: true,
        isTopSelling: false,
    });

    const isEditing = !!id; // Flag to check if in edit mode

    useEffect(() => {
        // If in edit mode, fetch product data
        if (isEditing) {
            dispatch(getProducts(id));
        }
        // Fetch categories for the dropdown
        // dispatch(getCategories()); // Might be populated
    }, [dispatch, id, isEditing]);

    // When data loaded (for editing), populate the form
    useEffect(() => {
        if (isEditing && product && product._id === id) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                shortDescription: product.shortDescription || '',
                price: product.price || '',
                discountPrice: product.discountPrice || '',
                category: product.category?._id || '',
                stock: product.stock || '',
                isPromotion: product.isPromotion || false,
                isNew: product.isNew || false,
                isTopSelling: product.isTopSelling || false,
            });
        }
    }, [isEditing, product, id]);


    const onChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const onSubmit = e => {
        e.preventDefault();
        if (isEditing) {
            dispatch(adminUpdateProduct(id, formData, navigate));
        } else {
            dispatch(adminCreateProduct(formData, navigate));
        }
    };

    if (loading && isEditing) return <p>Loading product data...</p>;

    return (
        <div>
            <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            {error && <p style={{color: 'red'}}>{error.msg}</p>}
            <form onSubmit={onSubmit}>
                {/* Name */}
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={onChange} required/>
                </div>
                {/* Category */}
                <div>
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={onChange} required>
                        <option value="">Select a Category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                {/* Price & Discount Price */}
                <div>
                    <label>Price</label>
                    <input type="number" name="price" value={formData.price} onChange={onChange} required/>
                </div>
                <div>
                    <label>Discount Price (Optional)</label>
                    <input type="number" name="discountPrice" value={formData.discountPrice} onChange={onChange} />
                </div>
                {/* Stock */}
                <div>
                    <label>Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={onChange} required/>
                </div>
                {/* Short Description */}
                <div>
                    <label>Short Description</label>
                    <input name="shortDescription" value={formData.shortDescription} onChange={onChange} required/>
                </div>
                {/* Full Description */}
                <div>
                    <label>Full Description</label>
                    <input name="description" value={formData.description} onChange={onChange} required />
                </div>
                {/* Checkboxes */}
                <div>
                    <label><input type="checkbox" name="isNew" value={formData.isNew} onChange={onChange} />Is New Arrival?</label>
                </div>
                <div>
                    <label><input type="checkbox" name="isTopSelling" value={formData.isTopSelling} onChange={onChange} />Is Top Selling?</label>
                </div>
                <div>
                    <label><input type="checkbox" name="isPromotion" value={formData.isPromotion} onChange={onChange} />Is on Promotion?</label>
                </div>

                {/* Implement function to Add Images later */}

                <button type="submit" className="btn btn-success" disabled={loading}>
                    {isEditing ? 'Update Product' : 'Create Product'}
                </button>
                <button type="button" onClick={() => navigate('/admin/products')} className="btn btn-secondary">
                    Cancel
                </button>
            </form>
        </div>
    );
}
 
export default ProductForm;