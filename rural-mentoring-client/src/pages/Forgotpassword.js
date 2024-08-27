import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Forgotpassword() {

    const navigate = useNavigate("");

    const [phone, setPhone] = useState("");
    const [type, setType] = useState("0");

    const getPassword = () => {
        if (phone.length !== 10) {
            alert("Invalid Phone Number");
        }
        else {
            Axios.post('http://127.0.0.1:3001/getpassword', {
                type: type,
                phone: phone,
            }).then((response) => {
                sessionStorage.setItem("ID", response.data[0].id);
                sessionStorage.setItem("PHONE", response.data[0].phone);
                sessionStorage.setItem("TYPE", type);
                navigate("/reset");
            });
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="d-flex justify-content-center align-items-center flex-column my-5">
                    <h2>Find your account</h2>
                    <p>Enter your Phone Number that is Linked to your Account</p>
                    <select className="form-select mt-4 w-25 mb-2" aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
                        <option value="0">Mentor Account</option>
                        <option value="1">Mentee Account</option>
                    </select>
                    <input type="number" className="form-control w-25 mb-4" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <button type="button" className="btn btn-primary btn-sm" onClick={getPassword}>Submit</button>
                </div>
            </div>
        </>
    );
}

export default Forgotpassword;