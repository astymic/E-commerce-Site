const axios = require('axios');
const fs = require('fs');

async function debugCheckout() {
    const baseURL = 'http://localhost:5000/api';
    console.log('--- Order Process Debugging Start ---');

    try {
        // 1. Register or Login
        console.log('Step 1: Authenticating...');
        let token;
        try {
            const loginRes = await axios.post(`${baseURL}/users/login`, {
                email: 'test@example.com',
                password: 'password123'
            });
            token = loginRes.data.token;
            console.log('Logged in successfully');
        } catch (e) {
            console.log('Login failed, trying registration...');
            const regRes = await axios.post(`${baseURL}/users/register`, {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                password: 'password123'
            });
            token = regRes.data.token;
            console.log('Registered successfully');
        }

        const headers = { 'x-auth-token': token };

        // 2. Get a Product
        console.log('Step 2: Fetching products...');
        const productsRes = await axios.get(`${baseURL}/products`);
        const product = productsRes.data.products[0];
        if (!product) throw new Error('No products found to purchase');
        console.log(`Using product: ${product.name} (ID: ${product._id})`);

        // 3. Add to Cart
        console.log('Step 3: Adding product to cart...');
        await axios.post(`${baseURL}/cart`, {
            productId: product._id,
            quantity: 1
        }, { headers });
        console.log('Added to cart');

        // 4. Place Order (This is where to expect the 500)
        console.log('Step 4: Placing order...');
        const orderData = {
            shippingDetails: {
                firstName: 'Test',
                lastName: 'User',
                phone: '1234567890',
                type: 'address',
                city: 'Test City',
                location: '123 Test Street'
            },
            paymentMethod: 'cash_on_delivery',
            doNotCall: false,
            deliveryToAnotherPerson: false
        };

        const orderRes = await axios.post(`${baseURL}/orders`, orderData, { headers });
        console.log('Order PLACED successfully!', orderRes.data._id);

    } catch (err) {
        console.log('ERROR during debugging flow:');
        if (err.response) {
            console.log(`Status: ${err.response.status}`);
            console.log('Data:', JSON.stringify(err.response.data, null, 2));
        } else {
            console.log(err.message);
        }
    }
}

debugCheckout();
