import React, { useState } from 'react';
import axios from 'axios';


function RegisterPage() {
    const [fromData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { firstName, lastName, email, password } = fromData;

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
            const body = JSON.stringify({ firstName, lastName, email, password });
            
            const res = await axios.post('/api/users/register', body, config);
            console.log('Registration Success:', res.data); // For now, just log success

            // Handle successful registration
            // Later implement Redux state and routing

        } catch (err) {
            console.error('Registration Error:', err.response ? err.response.data : err.message);
            setError(err.response && err.response.data && err.response.data.msg ? err.response.data.msg : 'Registration failed');
        }
    };


    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} 
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='firstName'>First Name:</label>
                    <input type='text' id='firstName' name='firstName' value={firstName} onChange={onChange} required/>
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name:</label>
                    <input type='text' id='lastName' name='lastName' value={lastName} onChange={onChange} required/>
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' value={email} onChange={onChange} required/>
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' value={password} onChange={onChange} required minLength="6"/>
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;