// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { sendOtp } from '../custom';

// function MenteeRegister() {


//     const navigate = useNavigate();

//     const [autoGenOtp, setAutoGenOtp] = useState(Math.floor(1000 + Math.random() * 9999));

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//     const [password, setPassword] = useState("");
//     const [cpassword, setCPassword] = useState("");
//     const [otp, setOtp] = useState("");
//     const [gender, setGender] = useState("1");
//     const [age, setAge] = useState("");
//     const [classField, setClassField] = useState("1");

//     const [cardFile, setCardFile] = useState();
//     const [cardFileName, setCardFileName] = useState("");

//     const saveCardFile = (e) => {
//         setCardFile(e.target.files[0]);
//         setCardFileName(e.target.files[0].name);
//     };

//     var isValid = true;
//     const [alertMsg, setAlertMsg] = useState("");

//     const makeValidation = () => {
//         if (name === "") {
//             isValid = false;
//             setAlertMsg("Name is required");
//         }
//         else if (!/.+@.+\.[A-Za-z]+$/.test(email)) {
//             isValid = false;
//             setAlertMsg("Invalid Email Address");
//         }
//         else if (phone.length !== 10) {
//             isValid = false;
//             setAlertMsg("Invalid Phone Number");
//         }
//         else if (parseInt(otp) !== parseInt(autoGenOtp)) {
//             isValid = false;
//             setAlertMsg("Enter Valid OTP");
//         }
//         else if (password === "") {
//             isValid = false;
//             setAlertMsg("Password is required");
//         }
//         else if (password !== cpassword) {
//             isValid = false;
//             setAlertMsg("Password not Matching");
//         }
//         else if (parseInt(age) > 18) {
//             isValid = false;
//             setAlertMsg("Age is must be 18 or Below");
//         }
//         else if (cardFileName === "") {
//             isValid = false;
//             setAlertMsg("Upload Aadhar Card");
//         }
//         else {
//             isValid = true;
//         }
//     }

//     const createAccount = () => {
//         makeValidation();
//         if (isValid) {
//             const formData = new FormData();
//             formData.append("name", name);
//             formData.append("email", email);
//             formData.append("phone", phone);
//             formData.append("password", password);
//             formData.append("gender", gender);
//             formData.append("age", age);
//             formData.append("classField", classField,);
//             formData.append("cardFile", cardFile);
//             formData.append("cardFileName", cardFileName);

//             Axios.post('http://127.0.0.1:3001/menteeregister',
//                 formData
//             ).then((response) => {
//                 if (response.data === "error") {
//                     setAlertMsg("Email/ Phone Number Already Exist");
//                 }
//                 else if (response.data === "success") {
//                     alert("Your Details are sent to Admin for Verification");
//                     navigate("/");
//                 }
//             });
//         }
//     }

//     const sendOTP = () => {
//         if (phone.length !== 10) {
//             setAlertMsg("Invalid Phone Number");
//         }
//         else {
//             var My_otp = Math.floor(1000 + Math.random() * 9999)
//             setAutoGenOtp(My_otp);
//             console.log("Sent Otp"+My_otp);
//           sendOtp(phone,My_otp);
//         }
//     }

//     return (
//         <>
//             <Navbar />
//             <div className="container">
//                 <div className="d-flex justify-content-center my-5">
//                     <div className="card shadow-lg rounded-4" style={{ width: '90%', maxWidth: '800px', padding: '20px' }}>
//                         <div className="card-header bg-primary text-light rounded-top-4" style={{ padding: '20px', fontSize: '1.25rem', fontWeight: '500', textAlign: 'center' }}>
//                             <h5 className="m-0">Create New Account</h5>
//                         </div>
//                         <div className="card-body">
//                             <div className="row g-4">
//                                 {alertMsg && (
//                                     <div className="col-12">
//                                         <div className="alert alert-danger" role="alert">
//                                             {alertMsg}
//                                         </div>
//                                     </div>
//                                 )}
//                                 <div className="col-12">
//                                     <label className="form-label">Full Name</label>
//                                     <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label">Email Address</label>
//                                     <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label">Contact Number</label>
//                                     <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
//                                 </div>
//                                 <div className="col-md-12">
//                                     <label className="form-label">OTP</label>
//                                     <div className="d-flex">
//                                         <input type="number" className="form-control me-2" value={otp} onChange={(e) => setOtp(e.target.value)} />
//                                         <button type="button" className="btn btn-warning" onClick={sendOTP}>Send OTP</button>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label">Password</label>
//                                     <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label">Confirm Password</label>
//                                     <input type="password" className="form-control" value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label">Gender</label>
//                                     <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
//                                         <option value="">Select Gender</option>
//                                         <option value="1">Male</option>
//                                         <option value="2">Female</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label">Age</label>
//                                     <input type="number" min="1" max="100" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label">Class</label>
//                                     <select className="form-select" value={classField} onChange={(e) => setClassField(e.target.value)}>
//                                         <option value="">Select Class</option>
//                                         {[...Array(10).keys()].map((num) => (
//                                             <option key={num + 1} value={num + 1}>{num + 1}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label className="form-label">Upload Aadhar Card</label>
//                                     <input type="file" accept=".pdf" className="form-control" onChange={saveCardFile} />
//                                 </div>
//                                 <div className="col-12">
//                                     <button type="button" className="btn btn-primary w-100" onClick={createAccount}>Register</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default MenteeRegister;


import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../custom';

function MenteeRegister() {

    const navigate = useNavigate();

    const [autoGenOtp, setAutoGenOtp] = useState(Math.floor(1000 + Math.random() * 9999));
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [gender, setGender] = useState("1");
    const [age, setAge] = useState("");
    const [classField, setClassField] = useState("1");
    const [cardFile, setCardFile] = useState();
    const [cardFileName, setCardFileName] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    const saveCardFile = (e) => {
        setCardFile(e.target.files[0]);
        setCardFileName(e.target.files[0].name);
    };

    const makeValidation = () => {
        let isValid = true;
        let message = "";

        // Name Validation
        if (name.trim() === "") {
            isValid = false;
            message = "Name is required";
        }
        // Email Validation
        else if (!/.+@.+\.[A-Za-z]+$/.test(email)) {
            isValid = false;
            message = "Invalid Email Address";
        }
        // Phone Number Validation
        else if (phone.length !== 10 || /\D/.test(phone) || /\s/.test(phone)) {
            isValid = false;
            message = "Phone number must be 10 digits long without spaces or alphabets";
        }
        // OTP Validation
        else if (parseInt(otp) !== parseInt(autoGenOtp)) {
            isValid = false;
            message = "Enter Valid OTP";
        }
        // Password Validation
        else if (password.trim() === "") {
            isValid = false;
            message = "Password is required";
        }
        else if (password !== cpassword) {
            isValid = false;
            message = "Passwords do not match";
        }
        else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            isValid = false;
            message = "Password must be at least 8 characters long and contain both letters and numbers";
        }
        // Age Validation
        else if (parseInt(age) > 18) {
            isValid = false;
            message = "Age must be 18 or below";
        }
        // Aadhar Card Validation
        else if (cardFileName === "") {
            isValid = false;
            message = "Upload Aadhar Card";
        }

        if (!isValid) {
            setAlertMsg(message);
        }

        return isValid;
    }

    const createAccount = () => {
        if (makeValidation()) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("password", password);
            formData.append("gender", gender);
            formData.append("age", age);
            formData.append("classField", classField);
            formData.append("cardFile", cardFile);
            formData.append("cardFileName", cardFileName);

            Axios.post('http://127.0.0.1:3001/menteeregister', formData)
                .then((response) => {
                    if (response.data === "error") {
                        setAlertMsg("Email/ Phone Number Already Exist");
                    } else if (response.data === "success") {
                        alert("Your Details are sent to Admin for Verification");
                        navigate("/");
                    }
                }).catch(error => {
                    console.error('Error:', error);
                    setAlertMsg("An error occurred while creating your account.");
                });
        }
    }

    const sendOTP = () => {
        if (phone.length !== 10 || /\D/.test(phone) || /\s/.test(phone)) {
            setAlertMsg("Invalid Phone Number");
        } else {
            var My_otp = Math.floor(1000 + Math.random() * 9999);
            setAutoGenOtp(My_otp);
            console.log("Sent OTP: " + My_otp);
            sendOtp(phone, My_otp);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="d-flex justify-content-center my-5">
                    <div className="card shadow-lg rounded-4" style={{ width: '90%', maxWidth: '800px', padding: '20px' }}>
                        <div className="card-header bg-primary text-light rounded-top-4" style={{ padding: '20px', fontSize: '1.25rem', fontWeight: '500', textAlign: 'center' }}>
                            <h5 className="m-0">Create New Account</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-4">
                                {alertMsg && (
                                    <div className="col-12">
                                        <div className="alert alert-danger" role="alert">
                                            {alertMsg}
                                        </div>
                                    </div>
                                )}
                                <div className="col-12">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Contact Number</label>
                                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">OTP</label>
                                    <div className="d-flex">
                                        <input type="number" className="form-control me-2" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                        <button type="button" className="btn btn-warning" onClick={sendOTP}>Send OTP</button>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Gender</label>
                                    <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Select Gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Age</label>
                                    <input type="number" min="1" max="100" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Class</label>
                                    <select className="form-select" value={classField} onChange={(e) => setClassField(e.target.value)}>
                                        <option value="">Select Class</option>
                                        {[...Array(10).keys()].map((num) => (
                                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Upload Aadhar Card</label>
                                    <input type="file" accept=".pdf" className="form-control" onChange={saveCardFile} />
                                </div>
                                <div className="col-12">
                                    <button type="button" className="btn btn-primary w-100" onClick={createAccount}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenteeRegister;
