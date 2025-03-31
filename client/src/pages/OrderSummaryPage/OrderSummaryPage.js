import React, { useDebugValue, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetails } from '../../redux/actions/orderActions';



function OrderSumamryPage() {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const orderState = useSelector(state => state.order);
    const { order, loading, error } = orderState;


    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId]);

    const formatDelivery = (details) => {
        if (!details) return 'N/A';
        let output = `${details.firstName} ${details.lastName}, ${details.phone}, ${details.city}`;
        if (details.type === 'store') output += `, Store Pickup: ${details.location}`;
        if (details.type === 'post') output += `, Postal Delivery: ${details.location}`;
        if (details.type === 'store') output += `, Home Delivery: ${details.location}`;
        return output;
    };


    const formatPaymentMethod = (method) => {
        switch(method) {
            case 'cash_on_delivery': return 'Cash on Delivery';
            case 'prepaid': return 'Prepaid (Card/Online)';
            case 'installment': return 'installments';
            default: return 'N/A';
        }
    };

    if (loading) {
        return <p>Loading order sumamry...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error loading order: {error.msg || 'Order not found'}</p>;
    }

    if (!order) {
        return <p>Order not found</p>;
    }


    return (
        <div className='order-summary-page container'>
            <h1>Order Confirmation</h1>
            <p>Thank you so much for your order!!!</p>

            <div className="order-details-summary">
                <h2>Order Summary (ID: {order._id})</h2>
                <p><strong>Date Placed:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                <h3>Shipping Details</h3>
                <p>{formatDelivery(order.shippingDetails)}</p>
                {order.deliveryToAnotherPerson && order.shippingDetails.recipientFirstName && (
                    <p><strong>Recipient:</strong> {order.shippingDetails.recipientFirstName} {order.shippingDetails.recipientLastName}</p>
                )}
                {order.shippingDetails.notes && <p><strong>Remarks:</strong> {order.shippingDetails.notes}</p>}
                {order.doNotCall && <p><i>(Do not call for confirmation requested)</i></p>}
            
            
                <h3>Payment Method</h3>
                <p>{formatPaymentMethod(order.paymentMethod)}</p>
                <p><strong>Payment Status</strong> {order.paymentStatus}</p>

                <h3>Order Items</h3>
                <table className="order-items-table">
                    <thead>
                        <tr>
                            <th colSpan="2">Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.products && order.products.map(item => (
                            <tr key={item.product?._id}>
                                <td>
                                    <img src={item.product?.images?.[0] || '/placeholder.png'}
                                        alt={item.product?.name || 'Product'}
                                        className='sumamry-item-image'
                                    />
                                </td>
                                <td>{item.product?.name || 'Product Name'}</td>
                                <td>${item.priceAtPurchase?.toFixed(2) || 'N/A'}</td>
                                <td>{item.quantity}</td>
                                <td>${(item.priceAtPurchase * item.quantity).toFixed(2) || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='order-summary-total'>
                    <strong>Total Amount: ${order.totalAmount?.toFixed(2)}</strong>
                </div>
            </div>

            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
            {/* <Link to="/profile/orders" className="btn btn-secondary">View Order History</Link>   Add Hisory later */}
        </div>
    );
}

export default OrderSumamryPage;