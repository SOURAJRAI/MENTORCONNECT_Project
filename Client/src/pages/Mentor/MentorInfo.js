import React, { useState } from 'react';
import Axios from 'axios';
import { Upload, Save } from 'lucide-react';

function MentorInfo() {

    const [age, setAge] = useState("");
    const [skill, setSkill] = useState("Maths");

    let isValid = true;

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [certFile, setCertFile] = useState();
    const [certFileName, setCertFileName] = useState("");

    const makeValidation = () => {
        setSuccessMsg("");
        if (age === "") {
            isValid = false;
            setErrorMsg("Age is required");
        }
        else if (parseInt(age) < 18) {
            isValid = false;
            setErrorMsg("Age must be 18 or Above");
        }
        else if (certFileName === "") {
            isValid = false;
            setErrorMsg("Upload Certificate");
        }
        else {
            isValid = true;
            setErrorMsg("");
        }
    }

    const savecertFile = (e) => {
        setCertFile(e.target.files[0]);
        setCertFileName(e.target.files[0].name);
    };

    const saveMentorInfo = () => {
        makeValidation();
        if (isValid) {
            const formData = new FormData();
            formData.append("user", sessionStorage.getItem("ID"));
            formData.append("age", age);
            formData.append("skill", skill);
            formData.append("certFile", certFile);
            formData.append("certFileName", certFileName);

            Axios.post('http://127.0.0.1:3001/savementorinfo', formData
            ).then((response) => {
                setSuccessMsg("Uploaded Successfully");
            });
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-body p-5">
                            <h2 className="card-title text-center mb-5 fw-bold text-primary">Upload Details</h2>

                            {errorMsg && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {errorMsg}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )}

                            {successMsg && (
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
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
                                                id="skill"
                                                value={skill}
                                                onChange={(e) => setSkill(e.target.value)}
                                            >
                                                <option value="Maths">Maths</option>
                                                <option value="Chemistry">Chemistry</option>
                                                <option value="Physics">Physics</option>
                                                <option value="Biology">Biology</option>
                                                <option value="Computer">Computer</option>
                                                <option value="EVS">EVS</option>
                                                <option value="Social">Social</option>
                                            </select>
                                            <label htmlFor="skill">Skill</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="certificate"
                                                accept=".pdf"
                                                onChange={savecertFile}
                                            />
                                            <label htmlFor="certificate">Upload Certificate (PDF)</label>
                                        </div>
                                    </div>

                                    <div className="col-12 mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                                            onClick={saveMentorInfo}
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

export default MentorInfo;