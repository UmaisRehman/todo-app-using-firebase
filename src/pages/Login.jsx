import { auth } from '../config/firebase/firebaseconfig';
import React, { useRef, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Login = () => {
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault();

        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
            const user = userCredential.user;
            console.log(user);
            navigate('/');
        } catch (error) {
            const errorCode = error.code;
            console.log(error);
            setError('Failed to log in. Please check your email and password.');
        }
    };

    return (

        <div className="container mt-5">
            <div className="card shadow mx-auto " style={{
                maxWidth: '400px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Corrected to camelCase
                border: 'none'

            }}>
                <div className="card-body">
                    <h2 className="text-center mb-4" style={{ color: "#000" }}>Login</h2>
                    <form onSubmit={login}>
                        <div className="mb-3">
                            {/* <label htmlFor="email" className="form-label">Email</label> */}
                            <input
                                type="email"
                                className="form-control "
                                id="email"
                                placeholder="Enter your email"
                                ref={email}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            {/* <label htmlFor="password" className="form-label">Password</label> */}
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                ref={password}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>} {/* Error message display */}
                        <button type="submit" className="btn  w-100 fw-bold border text-white rounded border-3 " style={{ backgroundColor: "#113065" }}
                        >Login</button>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default Login;

