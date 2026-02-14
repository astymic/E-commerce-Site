const axios = require('axios');

async function testOrder() {
    try {
        // First get a token by logging in (assuming 'admin@example.com' exists from seed)
        console.log('Logging in...');
        const loginRes = await axios.post('http://localhost:5000/api/users/login', {
            email: 'admin@example.com',
            password: 'password123'
        });
        const token = loginRes.data.token;
        console.log('Token received');

        // Add something to cart first to ensure cart is not empty
        console.log('Adding to cart...');
        // Need a product ID. Let's assume one exists or just try to post anyway to see validation
        const productsRes = await axios.get('http://localhost:5000/api/products');
        const productId = productsRes.data.products[0]._id;

        await axios.post('http://localhost:5000/api/cart', {
            productId: productId,
            quantity: 1
        }, { headers: { 'x-auth-token': token } });
        console.log('Added to cart');

        // Now place order
        console.log('Placing order...');
        const orderData = {
            shippingDetails: {
                firstName: 'Test',
                lastName: 'User',
                phone: '1234567890',
                type: 'address',
                city: 'Test City',
                location: '123 Test St'
            },
            paymentMethod: 'cash_on_delivery',
            doNotCall: false
        };

        const res = await axios.post('http://localhost:5000/api/orders', orderData, {
            headers: { 'x-auth-token': token }
        });
        console.log('Order created:', res.data);
    } catch (err) {
        console.log('Error Status:', err.response ? err.response.status : 'No response');
        console.log('Error Data:', err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
    }
}

testOrder();
