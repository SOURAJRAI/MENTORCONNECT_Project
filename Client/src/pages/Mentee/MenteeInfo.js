import React, { useState } from 'react';
import Axios from 'axios';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

function MenteeInfo() {

    const [age, setAge] = useState("");
    const [classField, setClassField] = useState("1");

    let isValid = true;

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const makeValidation = () => {
        setSuccessMsg("");
        if (age === "") {
            isValid = false;
            setErrorMsg("Age is required");
        }
        else if (parseInt(age) > 18) {
            isValid = false;
            setErrorMsg("Age is must be 18 or Below");
        }
        else {
            isValid = true;
            setErrorMsg("");
        }
    }

    const saveMenteeInfo = () => {
        makeValidation();
        if (isValid) {
            Axios.post('http://127.0.0.1:3001/savementeeinfo', {
                user: sessionStorage.getItem("ID"),
                age: age,
                classField: classField,
            }).then((response) => {
                setSuccessMsg("Uploaded Successfully");
            });
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-body p-5">
                            <h2 className="card-title text-center mb-4 fw-bold text-primary">Upload Details</h2>

                            {errorMsg && (
                                <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                                    <AlertCircle size={18} className="me-2" />
                                    {errorMsg}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )}

                            {successMsg && (
                                <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                                    <CheckCircle size={18} className="me-2" />
                                    {successMsg}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )}

                            <form>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="age"
                                                placeholder="Age"
                                                min="1"
                                                max="100"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                            />
                                            <label htmlFor="age">Age</label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <select
                                                className="form-select"
                                                id="classField"
                                                value={classField}
                                                onChange={(e) => setClassField(e.target.value)}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                    <option key={num} value={num.toString()}>{num}</option>
                                                ))}
                                            </select>
                                            <label htmlFor="classField">Class</label>
                                        </div>
                                    </div>

                                    <div className="col-12 mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                                            onClick={saveMenteeInfo}
                                        >
                                            <Save size={20} className="me-2" />
                                            Save Information
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenteeInfo;