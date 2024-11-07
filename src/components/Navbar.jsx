import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isNavbarToggled, setIsNavbarToggled] = useState(false); // State for toggling navbar

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

    const handleNavbarToggle = () => {
        setIsNavbarToggled(!isNavbarToggled); // Toggle navbar state
    };

    document.body.style.backgroundColor = "#f4f4f4";

    // Define the border color based on whether the navbar is toggled
    const borderColor = isNavbarToggled ? "#0f1056" : "#9FB6C3";  // Default or toggled border color

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#9FB6C3", borderColor: "#113065", borderRadius: "10px" }}>
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold fs-4" to="/">App</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={isNavbarToggled ? "true" : "false"} // Set aria-expanded based on state
                    aria-label="Toggle navigation"
                    onClick={handleNavbarToggle} // Toggle state when clicked
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarToggled ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav gap-2 me-auto">
                        <li className="nav-item">
                            <Link
                                className="nav-link active rounded fw-bold fs-6 px-3 py-2 border"
                                style={{ borderColor }} // Apply dynamic border color
                                to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link active rounded fw-bold fs-6 px-3 py-2 border"
                                style={{ borderColor }} // Apply dynamic border color
                                to="/todo">Add Todo</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav gap-2 ms-lg-auto">
                        {!isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active rounded fw-bold px-3 py-2 border"
                                        style={{ borderColor }} // Apply dynamic border color
                                        to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active rounded fw-bold px-3 py-2 border"
                                        style={{ borderColor }} // Apply dynamic border color
                                        to="/register">Register</Link>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link active rounded fw-bold px-3 py-2 border"
                                    onClick={signout}
                                    style={{ borderColor }} // Apply dynamic border color
                                >
                                    Sign Out
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <style>
                {`
                    .navbar-collapse.show {
                        background-color: #e2e8f0 !important; /* Soft, professional background color */
                        border-radius: 10px; /* Round corners for the expanded navbar */
                        border-top: 2px solid #9FB6C3; /* Subtle border color */
                        margin-top: 10px; /* Auto margin when expanded */
                    }
                `}
            </style>
        </nav>
    );
};

export default Navbar;
