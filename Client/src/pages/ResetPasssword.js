import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { sendOtp } from '../custom';

function ResetPasssword() {


    const navigate = useNavigate();

    const [otp, setOTP] = useState("");
    const [password, setPassword] = useState("");

    const [autoGenOtp, setAutoGenOtp] = useState(Math.floor(1000 + Math.random() * 9999));

    useEffect(() => {
        var My_otp = Math.floor(1000 + Math.random() * 9999);
        setAutoGenOtp(My_otp);
        console.log("Sent Otp: "+My_otp);
        sendOtp(sessionStorage.getItem("PHONE"),My_otp);
    }, []);

    const resetPassword = () => {
        if (parseInt(otp) !== parseInt(autoGenOtp)) {
            alert("Invalid OTP");
        }
        else if (password === "") {
            alert("Enter Password");
        }
        else {
            Axios.post('http://127.0.0.1:3001/respassword', {
                type: sessionStorage.getItem("TYPE"),
                id: sessionStorage.getItem("ID"),
                password: password
            }).then((response) => {
                console.log(response.data);
                navigate("/");
            });
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="d-flex justify-content-center align-items-center flex-column my-5">
                    <div className="card shadow-lg rounded-4" style={{ width: '100%', maxWidth: '400px' }}>
                        <div className="card-body p-4 text-center">
                            <h2 className="mb-3">Reset Password</h2>
                            <p className="mb-4">Enter the OTP we sent to {sessionStorage.getItem("PHONE")}</p>
                            <input
                                type="number"
                                className="form-control mb-3"
                                value={otp}
                                onChange={(e) => setOTP(e.target.value)}
                                placeholder="OTP"
                                style={{ maxWidth: '300px', margin: '0 auto' }}
                            />
                            <input
                                type="password"
                                className="form-control mb-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New Password"
                                style={{ maxWidth: '300px', margin: '0 auto' }}
                            />
                            <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={resetPassword}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPasssword;