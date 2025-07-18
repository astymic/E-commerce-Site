import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminCategories, adminDeleteCategory } from "../../../redux/actions/adminActions";


function AdminCategoryManagment() {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getAdminCategories());
    }, [dispatch]);

    const handleDelete = (categoryId, categoryName) => {
        if (window.confirm(`Are you sure you want to delete the category "${categoryName}"? This cannot be undone.`)) {
            dispatch(adminDeleteCategory(categoryId));
        }
    };

    if (loading && categories.length === 0) {
        return <p>Loading categories...</p>;
    }

    return (
        <div>
            <div className="admin-page-header">
                <h2>Manage Categories</h2>
                <Link to="/admin/categories/new" className="btn btn-primary">Add New Categories</Link>
            </div>
            {error && <p style={{ color: 'red' }}>Error: {error.msg || 'Could not fetch categories.'}</p>}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Parent Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.length > 0 ? (
                        categories.map(cat => (
                            <tr key={cat._id}>
                                <td>{cat.name}</td>
                                <td>{cat.slug}</td>
                                <td>{cat.parent?.name || '—'}</td>
                                <td>
                                    <Link to={`/admin/categories/edit/${cat._id}`} className="btn btn-sm">Edit</Link>
                                    <button 
                                        onClick={() => handleDelete(cat._id, cat.name)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No categories found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminCategoryManagment;