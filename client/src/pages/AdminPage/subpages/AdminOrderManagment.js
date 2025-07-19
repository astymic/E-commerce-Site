import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAdminOrders, adminUpdateOrderStatus } from "../../../redux/actions/adminActions";


function AdminOrderManagment() {
    const dispatch = useDispatch();
    const { allOrders, loading, error } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(getAdminOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(adminUpdateOrderStatus(orderId, newStatus));
    };

    const statusOptions = ['processing', 'confirmed', 'shipped', 'delivered', 'canceled'];
    
    if (loading) {
        return <p>Laoding orders...</p>;
    }

    return (
        <div>
            <div className="admin-page-header">
                <h2>Manage Orders</h2>
            </div>
            {error && <p style={{ color: 'red' }}>Error: {error.msg || 'Could not fetch orders.'}</p>}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customers</th>
                        <th>Total</th>
                        <th>Payment Status</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders && allOrders.length > 0 ? (
                        allOrders.map(order => (
                            <tr key={order._id}>
                                <td>
                                    <Link to={`/order-summary/${order._id}`}>{order._id}</Link>
                                </td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>{order.user?.firstName || 'Guest'} {order.user?.lastName || ''}</td>
                                <td>${order.totalAmount?.toFixed(2)}</td>
                                <td>{order.paymentStatus}</td>
                                <td>
                                    <select 
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <Link to={`/order-summary/${order._id}`} className="btn btn-sm">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">Bo orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminOrderManagment;