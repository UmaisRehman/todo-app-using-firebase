import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    const signout = (event) => {
        event.preventDefault();
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                console.log("Signed out");
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    document.body.style.backgroundColor = "#f4f4f4"; 

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#9FB6C3" }}>
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold fs-2" to="/">App</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav gap-2">
                        <li className="nav-item">
                            <Link className="nav-link active rounded fw-bold bg-transparent fs-5 px-3 py-2 border border-2" 
                                  style={{ color: "#0f1056" }} 
                                  to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active rounded fw-bold bg-transparent fs-5 px-3 py-2 border border-2" 
                                  style={{ color: "#0f1056" }} 
                                  to="/todo">Add Todo</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto gap-2">
                        {!isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active rounded fw-bold bg-transparent px-3 py-2 border border-2" 
                                          style={{ color: "#0f1056" }} 
                                          to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active rounded fw-bold bg-transparent px-3 py-2 border border-2" 
                                          style={{ color: "#0f1056" }} 
                                          to="/register">Register</Link>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <li className="nav-item border border-2 rounded fw-bold">
                                <Link className="nav-link active px-3 py-2" onClick={signout} style={{ color: "#0f1056" }}>Sign Out</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
