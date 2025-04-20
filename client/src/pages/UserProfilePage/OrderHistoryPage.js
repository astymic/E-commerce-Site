import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../../redux/actions/orderActions';


function OrderHistoryPage() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.order);
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUserOrders());
        }
    }, [dispatch, isAuthenticated]);

    if (loading) {
        return <p>Loading order history...</p>
    }
    
    return (
        <div className="order-history-page">
            <h2>Your Order History</h2>
            {error && <p style={{ color: 'red' }}>Error loading orders: {error.msg || 'Could not fetch orders'}</p>}
            {!loading && !error && orders && orders.length === 0 && (
                <p>You have not placed any orders yet.</p>
            )}
            {!loading && !error && orders && orders.length > 0 && (
                <table className="order-history-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date Placed</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>${order.totalAmount?.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Link to={`/order-summary/${order._id}`} className="btn btn-sm btn-info">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OrderHistoryPage;