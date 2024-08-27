import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Star, User } from 'lucide-react';

function Feedbacks() {

    const [fedList, setFedList] = useState([]);

    const getMyFeedback = () => {
        Axios.post("http://127.0.0.1:3001/getfeedback", {
            mentor: sessionStorage.getItem("ID"),
        }).then((response) => {
            setFedList(response.data)
        });
    }

    useEffect(() => {
        getMyFeedback();
    }, []);

    return (
        <div className="container py-5">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {fedList.map((data, key) => (
                    <div className="col" key={key}>
                        <div className="card h-100 border-0 shadow-sm hover-lift">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                            <User size={24} className="text-primary" />
                                        </div>
                                        <div>
                                            <h5 className="card-title mb-0 text-primary">{data.name}</h5>
                                            <p className="card-subtitle mb-0 text-muted small">{data.email}</p>
                                        </div>
                                    </div>
                                    <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill={i < data.rating ? "#ffc107" : "none"}
                                                color={i < data.rating ? "#ffc107" : "#6c757d"}
                                                className="me-1"
                                            />
                                        ))}
                                        <span className="ms-1 fw-bold">{data.rating}</span>
                                    </span>
                                </div>
                                <p className="card-text text-muted">{data.message}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feedbacks;