import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const adminLogin = () => {
        if (username === "admin" && password === "123456") {
            sessionStorage.setItem("EMAIL", 'admin@gmail.com');

            navigate("/admin/home");
        }
        else {
            alert("Invalid Login Credentials");
        }
    }

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-lg p-4 mb-5 bg-white rounded" style={{ width: '20rem' }}>
                <div className="card-header text-center bg-primary text-white">
                    <h5 className="mb-0">Admin Login</h5>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="button" className="btn btn-primary w-100" onClick={adminLogin}>Login</button>
                </div>
            </div>
        </div>

    );
}

export default AdminLogin;