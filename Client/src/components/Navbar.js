import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-4">
            <div className="container-fluid px-4">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    {/* <img src="/path-to-your-logo.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-top me-2" /> */}
                    <span className="fw-bold text-primary">MentorConnect</span>
                </Link>

            </div>
        </nav>
    );
}

export default Navbar;