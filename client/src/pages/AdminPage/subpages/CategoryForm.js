import React, { useState,  useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { adminCreateCategory, adminUpdateCategory } from '../../../redux/actions/adminActions';
import { getCategory, clearCategoryState, getCategories } from '../../../redux/actions/categoryActions';


function CategoryForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { category, categories, loading, error } = useSelector(state => state.category);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parentCategory: ''
    });

    const isEditing = !!id;

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategories());
        }
        if (isEditing) {
            dispatch(getCategory(id));
        }
        // Clear on unmount
        return () => {
            dispatch(clearCategoryState());
        }
    }, [dispatch, id, isEditing, categories.length]);

    // Populate form when category data loads for editing
    useEffect(() => {
        if (isEditing && category && category._id === id) {
            setFormData({
                name: category.name || '',
                description: category.description || '',
                parentCategory: category.parent?._id || ''
            });
        }
    }, [category, isEditing, id]);

    const onChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = e => {
        e.preventDefault();
        if (isEditing) {
            dispatch(adminUpdateCategory(id, formData, navigate));
        } else {
            dispatch(adminCreateCategory(formData, navigate));
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Category' : 'Add New Category'}</h2>
            {error && <p style={{color: 'red'}}>{error.msg}</p>}
            <form onSubmit={onSubmit}>
                <div>
                    <label>Category Name</label>
                    <input type="text" name="name" value={formData.name} onChange={onChange} required />
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={onChange}></textarea>
                </div>
                <div>
                    <label>Parent Category (Optional)</label>
                    <select name="parentCategory" value={formData.parentCategory} onChange={onChange}>
                        <option value="">-- No Parent --</option>
                        {categories
                            .filter(cat => cat._id !== id)
                            .map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit" className="btn btn-success" disabled={loading}>
                    {isEditing ? 'Update Category' : 'Create Category'}
                </button>
                <button type="button" onClick={() => navigate('/admin/categories')} className="btn btn-secondary">
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default CategoryForm;