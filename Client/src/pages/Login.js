// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Axios from 'axios';

// function Login() {

//     const navigate = useNavigate();

//     const [phone, setPhone] = useState("");
//     const [password, setPassword] = useState("");
//     const [type, setType] = useState("0");

//     var isValid = true;
//     const [alertMsg, setAlertMsg] = useState("");

//     const makeValidation = () => {
//         if (phone === "") {
//             isValid = false;
//             setAlertMsg("Phone Number is required");
//         }
//         else if (password === "") {
//             isValid = false;
//             setAlertMsg("Password is required");
//         }
//         else {
//             isValid = true;
//         }
//     }

//     const doLogin = () => {
//         makeValidation();
//         if (isValid) {
//             Axios.post('http://127.0.0.1:3001/login', {
//                 phone: phone,
//                 password: password,
//                 type: type,
//             }).then((response) => {
//                 if (Object.keys(response.data).length > 0) {
//                     sessionStorage.setItem("ID", response.data[0].id);
//                     sessionStorage.setItem("NAME", response.data[0].name);
//                     sessionStorage.setItem("EMAIL", response.data[0].email);
//                     sessionStorage.setItem("PHONE", response.data[0].phone);
//                     sessionStorage.setItem("ISLOGIN", "valid");
//                     if (parseInt(type) === 1) {
//                         navigate("/mentee");
//                     }
//                     else {
//                         navigate("/mentor");
//                     }
//                 }
//                 else {
//                     setAlertMsg("Invalid Login Credentials");
//                 }
//             });
//         }
//     }

//     return (
//         <>
//             <Navbar />
//             <div className="container">
//                 <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
//                     <div className="card shadow-lg rounded-4" style={{ width: '100%', maxWidth: '500px' }}>
//                         <div className="card-header bg-primary text-light rounded-top-4" style={{ padding: '20px' }}>
//                             <h5 className="m-0 text-center">Login</h5>
//                         </div>
//                         <div className="card-body p-4">
//                             {alertMsg && (
//                                 <div className="alert alert-danger mb-4" role="alert">
//                                     {alertMsg}
//                                 </div>
//                             )}
//                             <div className="mb-3">
//                                 <label className="form-label">Contact Number</label>
//                                 <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Password</label>
//                                 <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
//                             </div>
//                             <div className="d-flex justify-content-between align-items-center mb-4">
//                                 <Link to="/forgotpassword" className="text-primary">Forgot Password?</Link>
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Account Type</label>
//                                 <select className="form-select" aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
//                                     <option value="0">Mentor Account</option>
//                                     <option value="1">Mentee Account</option>
//                                 </select>
//                             </div>
//                             <button type="button" className="btn btn-primary w-100 mb-3" onClick={doLogin}>Login</button>
//                             <div className="text-center">
//                                 <Link to="/register" className="text-danger">Register new Account</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Axios from 'axios';

function Login() {

    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("0");

    const [alertMsg, setAlertMsg] = useState("");

    const makeValidation = () => {
        let isValid = true;

        // Phone number validation
        if (phone.trim() === "") {
            isValid = false;
            setAlertMsg("Phone Number is required");
        } else if (/[a-zA-Z]/.test(phone)) {
            isValid = false;
            setAlertMsg("Phone number cannot have alphabets.");
        } else if (/\s/.test(phone)) {
            isValid = false;
            setAlertMsg("Phone number cannot have spaces.");
        } else if (!/^\d{10}$/.test(phone)) {
            isValid = false;
            setAlertMsg("Invalid Phone Number. Please enter a 10-digit number without spaces or alphabets.");
        }

        // Password validation
        else if (password.trim() === "") {
            isValid = false;
            setAlertMsg("Password cannot be blank. Enter password again.");
        } else if (password[0] === ' ') {
            isValid = false;
            setAlertMsg("No spaces allowed in the password. Incorrect password.");
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            isValid = false;
            setAlertMsg("Valid password must be entered. Password mismatch.");
        }

        return isValid;
    }

    const doLogin = () => {
        
        if (makeValidation()) {
            Axios.post('http://127.0.0.1:3001/login', {
                phone: phone,
                password: password,
                type: type,
            }).then((response) => {
                if (Object.keys(response.data).length > 0) {
                    sessionStorage.setItem("ID", response.data[0].id);
                    sessionStorage.setItem("NAME", response.data[0].name);
                    sessionStorage.setItem("EMAIL", response.data[0].email);
                    sessionStorage.setItem("PHONE", response.data[0].phone);
                    sessionStorage.setItem("ISLOGIN", "valid");
                    if (parseInt(type) === 1) {
                        navigate("/mentee");
                    } else {
                        navigate("/mentor");
                    }
                } else {
                    setAlertMsg("Invalid Login Credentials");
                }
            });
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <div className="card shadow-lg rounded-4" style={{ width: '100%', maxWidth: '500px' }}>
                        <div className="card-header bg-primary text-light rounded-top-4" style={{ padding: '20px' }}>
                            <h5 className="m-0 text-center">Login</h5>
                        </div>
                        <div className="card-body p-4">
                            {alertMsg && (
                                <div className="alert alert-danger mb-4" role="alert">
                                    {alertMsg}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="form-label">Contact Number</label>
                                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <Link to="/forgotpassword" className="text-primary">Forgot Password?</Link>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Account Type</label>
                                <select className="form-select" aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
                                    <option value="0">Mentor Account</option>
                                    <option value="1">Mentee Account</option>
                                </select>
                            </div>
                            <button type="button" className="btn btn-primary w-100 mb-3" onClick={doLogin}>Login</button>
                            <div className="text-center">
                                <Link to="/register" className="text-danger">Register new Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
