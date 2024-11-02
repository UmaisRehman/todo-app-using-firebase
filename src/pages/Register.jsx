
import { auth } from '../config/firebase/firebaseconfig';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import './style.css'; // Ensure you import your CSS file

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow mx-auto transparent-card" style={{ maxWidth: '400px' }}>
                <div className="card-body">
                <h2 className="text-center mb-4">Register</h2>

                    <form onSubmit={register}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="Full Name"
                                placeholder="Enter your Full Name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="confirm password"
                                placeholder="Confirm password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn  w-100 fw-bold border border-3"style={{  
                            color : 'white',
                            backgroundColor: "#113065"
                        }}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
