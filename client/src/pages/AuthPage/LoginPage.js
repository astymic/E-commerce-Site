import React, { useState } from 'react';
import axios from 'axios';


function LoginPage() {
    const [fromData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { email, password } = fromData;

    const onChange = e => setFormData({ ...fromData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({ email, password });
            
            const res = await axios.post('/api/users/login', body, config);
            console.log('Login Success:', res.data); // For now, just log success

            // Handle successful registration
            // Later implement Redux state and routing

        } catch (err) {
            console.error('Login Error:', err.response ? err.response.data : err.message);
            setError(err.response && err.response.data && err.response.data.msg ? err.response.data.msg : 'Login failed');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' value={email} onChange={onChange} required/>
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' value={password} onChange={onChange} required/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default LoginPage;