import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
function HomeNavbar() {

    const navigate = useNavigate();
    const userEmail = sessionStorage.getItem("EMAIL");

    const doLogout = () => {
        if (window.confirm("Are you sure want to Logout?") === true) {
            sessionStorage.setItem("ISLOGIN", "invalid");
            navigate("/");
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-4">
            <div className="container-fluid px-4">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    {/* <img src="/path-to-your-logo.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-top me-2" /> */}
                    <span className="fw-bold text-primary">MentorConnect</span>
                </Link>

                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center me-3">
                        <User size={18} className="text-muted me-2" />
                        <span className="text-muted small">{userEmail}</span>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm d-flex align-items-center"
                        onClick={doLogout}
                    >
                        <LogOut size={18} className="me-2" />
                        Logout
                    </button>
                </div>
            </div>
        </nav>

    );
}

export default HomeNavbar;