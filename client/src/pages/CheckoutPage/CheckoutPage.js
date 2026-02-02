import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { placeOrder, clearOrderState } from '../../redux/actions/orderActions';


function CheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: cartItems, loading: cartLoading } = useSelector(state => state.cart);
    const { user, isAuthenticated, laoding: authLoading } = useSelector(state => state.auth);
    const orderState = useSelector(state => state.order);
    const { order: placedOrder, laoding: orderLoading, error: orderError } = orderState;

    const [formData, setformData] = useState({
        firstName: '',
        lastName: '',
        phone: '',

        deliveryType: '',
        deliveryCity: '',
        deliveryLocation: '',
        deliveryAddress: '',

        paymentMethod: '',

        doNotCall: false,
        deliveryToAnotherPerson: false,
        recipientFirstName: '',
        recipientLastName: '',
        notes: ''
    });

    // State for UI Control
    const [paymentEnabled, setPaymentEnabled] = useState(false);
    const [formError, setFormError] = useState(null);

    // Pre-fill form if user is logged in has data
    useEffect(() => {
        if (isAuthenticated && user) {
            setformData(prevData => ({
                ...prevData,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
            }));
        }
    }, [isAuthenticated, user]);


    useEffect(() => {
        setFormError(orderError ? (orderError.msg || 'Order placement failed') : null);
    }, [orderError]);


    const onChange = e => {
        const { name, value, type, checked } = e.target;
        setformData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'deliveryType') {
            setPaymentEnabled(!!value);
            setformData(prevData => ({ ...prevData, paymentMethod: '' }));
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        setFormError(null);
        console.log('Placing Order with Data:', formData);
        dispatch(placeOrder(formData));
    };


    useEffect(() => {
        if (placedOrder && placedOrder._id) {
            console.log('Order placed successfully, redirecting...', placedOrder._id);
            navigate(`/order-summary/${placedOrder._id}`);
        }
    }, [placedOrder, navigate]);


    useEffect(() => {
        return () => {
            dispatch(clearOrderState());
        };
    }, [dispatch]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = item.product?.price | 0;
            return total + itemPrice * item.quantity;
        }, 0).toFixed(2);
    };

    // Logic for Delivery Options
    const renderDeliveryOptions = () => {
        // Add office selection later
        return (
            <>
                <label htmlFor="deliveryCity">City:</label>
                <input type="text" id="deliveryCity" name="deliveryCity" value={formData.deliveryCity} onChange={onChange} required/>

                {formData.deliveryType === 'store' && (
                    <div>
                        <label htmlFor="deliveryLocation">Store Location:</label>
                        <input type="text" id="deliveryLocation" name="deliveryLocation" value={formData.deliveryLocation} onChange={onChange} required placeholder='Seelct store...'/>
                    </div>
                )}
                {formData.deliveryType === 'post' && (
                    <div>
                        <label htmlFor="deliveryLocation">Pickup Point:</label>
                        <input type="text" id="deliveryLocation" name="deliveryLocation" value={formData.deliveryLocation} onChange={onChange} required placeholder='Enter pickup poin...'/>
                    </div>
                )}
                {formData.deliveryType === 'address' && (
                    <div>
                        <label htmlFor="deliveryLocation">Address Line 1:</label>
                        <input type="text" id="deliveryLocation" name="deliveryLocation" value={formData.deliveryLocation} onChange={onChange} required/>
                        <label htmlFor="deliveryAddress">Address Line 2 (Optional):</label>
                        <input type="text" id="deliveryAddress" name="deliveryAddress" value={formData.deliveryAddress} onChange={onChange}/>
                    </div>
                )}
            </>
        );
    };

    const renderPaymentOptions = () => {
        let allowedMethods = [];
        if (formData.deliveryType === 'store') {
            allowedMethods = ['cash_on_delivery', 'prepaid', 'installment'];
        } else if (formData.deliveryType === 'post') {
            allowedMethods = ['cash_on_delivery', 'prepaid'];
        } else if (formData.deliveryType === 'address') {
            allowedMethods = ['prepaid'];
        }

        return (
            <>
                {allowedMethods.includes('cash_on_delivery') && (
                    <label>
                        <input type="radio" name="paymentMethod" value="cash_on_delivery" checked={formData.paymentMethod === 'cash_on_delivery'} onChange={onChange} required/>
                        Cash on Delivery
                    </label>
                )}
                {allowedMethods.includes('prepaid') && (
                    <label>
                        <input type="radio" name="paymentMethod" value="prepaid" checked={formData.paymentMethod === 'prepaid'} onChange={onChange} required/>
                        Prepayement (Card/Online)
                    </label>
                )}
                {allowedMethods.includes('installment') && (
                    <label>
                        <input type="radio" name="paymentMethod" value="installment" checked={formData.paymentMethod === 'installment'} onChange={onChange} required/>
                        Installments
                        {/* Add  Installments later */}
                    </label>
                )}
            </>
        );
    };

    if (!authLoading && !isAuthenticated) { return <Navigate to="/login" />; }
    if (!cartLoading && cartItems.length === 0 && !placeOrder) {
        return <p>Your cart is empty. <Link to="/">Continue Shopping</Link></p>;
    }


    return (
        <div className='checkout-page container'>
            <h1>Checkout</h1>
            {formError && <p style={{ color: 'red' }}>Error: {formError}</p>}
            <form onSubmit={onSubmit}>
                {/* Personal Details */}
                <section className="checkout-section">
                    <h2>1. Your Details</h2>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={onChange} required/>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={onChange} required/>

                    </div>
                    <div>
                        <label htmlFor="phone">Phone Number:</label>
                        <input type="text" id="phone" name="phone" value={formData.phone} onChange={onChange} required/>
                    </div>
                </section>

                {/* Delivery/Pickup */}
                <section className="checkout-section">
                    <h2>2. Delivery/Pickup Method</h2>
                    <div>
                        <label>
                            <input type="radio" name="deliveryType" value="store" checked={formData.deliveryType === 'store'} onChange={onChange} required/>
                            Store Pickup
                        </label>
                        <label>
                            <input type="radio" name="deliveryType" value="post" checked={formData.deliveryType === 'post'} onChange={onChange} required/>
                            Postal Delivery
                        </label>
                        <label>
                            <input type="radio" name="deliveryType" value="address" checked={formData.deliveryType === 'address'} onChange={onChange} required/>
                            Home Delivery                            
                        </label>
                    </div>
                    {formData.deliveryType && renderDeliveryOptions()}
                </section>


                {/* Payment Method */}
                <section className={`checkout-section ${!paymentEnabled ? 'disable' : ''}`}>
                    <h2>3. Payment Method</h2>
                    {paymentEnabled ? renderPaymentOptions() : <p>Please select a delivery method firts</p>}
                </section>

                {/* Options */}
                <section className="checkout-section">
                    <h2>4. Additional Options</h2>
                    <div>
                        <label>
                            <input type="checkbox" name="doNotCall" checked={formData.doNotCall} onChange={onChange} />
                            Do not call for confirmation
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="deliveryToAnotherPerson" checked={formData.deliveryToAnotherPerson} onChange={onChange} />
                            Delivery to another person
                        </label>
                    </div>
                    {formData.deliveryToAnotherPerson && (
                        <>
                            <div>
                                <label htmlFor="recipientFirstName">Recipient's First Name</label>
                                <input type="text" id="recipientFirstName" name="recipientFirstName" value={formData.recipientFirstName} onChange={onChange} required/>
                            </div>
                            <div>
                                <label htmlFor="recipientLastName">Recipient's Last Name</label>
                                <input type="text" id="recipientLastName" name="recipientLastName" value={formData.recipientLastName} onChange={onChange} required/>
                            </div>
                        </>
                    )}
                    <div>
                        <label htmlFor="notes">Customer Remarks:</label>
                        <textarea name="notes" id="notes" value={formData.notes} onChange={onChange}></textarea>
                    </div>
                </section>

                {/* Order Summary */}
                <section className="checkout-section order-summary">
                    <h2>5. Order Summary</h2>
                    <p>Total Items: {cartItems.length}</p>
                    <p>Total Price: ${calculateTotal()}</p>
                </section>

                <button type="submit" className="btn btn-primary btn-block" disabled={!formData.paymentMethod || cartLoading || authLoading || orderLoading}>
                    {orderLoading ? 'Placing Order...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
}


export default CheckoutPage;