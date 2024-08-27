import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Star, Send } from 'lucide-react';

function Feedback() {

    const [mentorList, setMentorList] = useState([]);
    const [mentor, setMentor] = useState("");
    const [message, setMessage] = useState("");

    const [rate, setRate] = useState("1");

    const getMyRequets = () => {
        Axios.post("http://127.0.0.1:3001/getmentorlist", {
            mentee: sessionStorage.getItem("ID"),
        }).then((response) => {
            setMentorList(response.data)
        });
    }

    useEffect(() => {
        getMyRequets();
    }, []);

    let isValid = true;

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const makeValidation = () => {
        setSuccessMsg("");
        if (mentor === "") {
            isValid = false;
            setErrorMsg("Select Mentor");
        }
        else if (message === "") {
            isValid = false;
            setErrorMsg("Message is required");
        }
        else {
            isValid = true;
            setErrorMsg("");
        }
    }

    const saveFeedback = () => {
        makeValidation();
        if (isValid) {
            Axios.post('http://127.0.0.1:3001/addfeedback', {
                mentee: sessionStorage.getItem("ID"),
                mentor: mentor,
                message: message,
                rating: rate
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
                            <h2 className="card-title text-center mb-4 fw-bold text-primary">Send Feedback</h2>

                            {errorMsg && (
                                <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                                    {errorMsg}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )}

                            {successMsg && (
                                <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                                    {successMsg}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )}

                            <form>
                                <div className="mb-4">
                                    <label htmlFor="mentorSelect" className="form-label">Select Mentor</label>
                                    <select
                                        id="mentorSelect"
                                        className="form-select form-select-lg"
                                        onChange={(e) => setMentor(e.target.value)}
                                        value={mentor}
                                    >
                                        <option value="" disabled>Choose a mentor</option>
                                        {mentorList.map((data) => (
                                            <option key={data.id} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4 text-center">
                                    <label className="form-label d-block mb-3">Rate Your Experience</label>
                                    <div className="star-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`rating-star mx-1 ${rate >= star ? 'text-warning' : 'text-muted'}`}
                                                onClick={() => setRate(star)}
                                                size={32}
                                                fill={rate >= star ? "currentColor" : "none"}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="feedbackMessage" className="form-label">Your Feedback</label>
                                    <textarea
                                        id="feedbackMessage"
                                        className="form-control form-control-lg"
                                        rows="5"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Share your experience..."
                                    ></textarea>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                                    onClick={saveFeedback}
                                >
                                    <Send size={20} className="me-2" />
                                    Submit Feedback
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Feedback;