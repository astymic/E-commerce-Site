import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminProducts } from '../../../redux/actions/adminActions';


function AdminProductManagment() {
    const dispatch = useDispatch();
    const { products: productsData, loading, error } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch]);

    const productList = Array.isArray(productsData) ? productsData : productsData?.products || [];

    if (loading) {
        return <p>Loading products...</p>
    }

    return (
        <div>
            <div className="admin-page-header">
                <h2>Manage Products</h2>
                <Link to="/admin/products/new" className="btn btn-primary">Add New Product</Link>
            </div>
            {error && <p style={{ color: 'red' }}>Error: {error.msg}</p>}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.length > 0 ? (
                        productList.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.category?.name || 'N/A'}</td>
                                <td>{product.price?.toFixed(2)}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <Link to={`/admin/products/edit/${product._id}`} className="btn btn-sm" >Edit</Link>
                                    {/* <button className="btn btn-sm btn-danger">Delete</button> */}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminProductManagment;