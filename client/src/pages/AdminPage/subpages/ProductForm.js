import React, { useState, useEffect } from "react";
import { useParams, useNavigate, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProduct, clearProductState } from "../../../redux/actions/productActions";
import { adminCreateProduct, adminUpdateProduct, adminUploadImage } from "../../../redux/actions/adminActions";
import { getCategories } from "../../../redux/actions/categoryActions";

import resolveImageUrl from "../../../utils/resolveImageUrl";


function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { product, loading, error } = useSelector(state => state.product);
    const { categories } = useSelector(state => state.category)
    const { imagePath, imageLoading } = useSelector(state => state.admin);

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

    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const isEditing = !!id;


    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategories());
        }

        // If in edit mode, fetch product data
        if (isEditing) {
            dispatch(getProduct(id));
        }

        return () => {
            dispatch(clearProductState());
        }
    }, [dispatch, id, isEditing, categories.length]);


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
                isNew: product.isNew !== undefined ? product.isNew : false,
                isTopSelling: product.isTopSelling || false,
            });
            setImages(product.images || []);
        }
    }, [product, isEditing, id]);
    // }, [product]);

    useEffect(() => {
        if (imagePath) {
            setImages(prevImages => [...prevImages, imagePath]);
        }
    }, [imagePath]);


    const onFileChange = e => {
        setSelectedFile(e.target.files[0]);
    };

    const onImageUpload = () => {
        if (selectedFile) {
            const uploadData = new FormData();
            uploadData.append('productImage', selectedFile);
            dispatch(adminUploadImage(uploadData));
            setSelectedFile(null);
        }
    };

    const removeImage = (imgPath) => {
        setImages(images.filter(img => img !== imgPath));
    };

    const onChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const onSubmit = e => {
        e.preventDefault();
        const finalProductData = {
            ...formData,
            images: images
        };

        if (isEditing) {
            dispatch(adminUpdateProduct(id, finalProductData, navigate));
        } else {
            dispatch(adminCreateProduct(finalProductData, navigate));
        }
    };

    if (loading && isEditing) {
        return <p>Loading product data...</p>;
    }

    return (
        <div>
            <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            {error && <p style={{ color: 'red' }}>{error.msg || 'An error occurred'}</p>}
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
                    <input type="number" name="price" value={formData.price} onChange={onChange} required step="0.01"/>
                </div>
                <div>
                    <label>Discount Price (Optional)</label>
                    <input type="number" name="discountPrice" value={formData.discountPrice} onChange={onChange} step="0.01"/>
                </div>
                {/* Stock */}
                <div>
                    <label>Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={onChange} required/>
                </div>
                {/* Short Description */}
                <div>
                    <label>Short Description</label>
                    <textarea name="shortDescription" value={formData.shortDescription} onChange={onChange} required/>
                </div>
                {/* Full Description */}
                <div>
                    <label>Full Description</label>
                    <textarea name="description" value={formData.description} onChange={onChange} required />
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
                <div className="form-section">
                    <h3>Product Images</h3>
                    <div className="image-preview-container">
                        {images.map((img, index) => (
                            <div key={index} className="image-preview">
                                <img src={resolveImageUrl(img)} alt={`Product Preview ${index + 1}`} />
                                <button type="button" onClick={() => removeImage(img)} className="btn-remove-img">×</button>
                            </div>
                        ))}
                    </div>
                    <div className="image-upload-form">
                        <input type="file" onChange={onFileChange} />
                        <button type="button" onClick={onImageUpload} disabled={!selectedFile || imageLoading}>
                            {imageLoading ? 'Uploading..' : 'Upload Image'}
                        </button>
                    </div>
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