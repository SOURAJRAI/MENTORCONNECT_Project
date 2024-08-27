import React, { useState } from 'react';
import Axios from 'axios';

function MentorSearch() {
    const [skill, setSkill] = useState("Maths");
    const [mentorSearchList, setMentorSearchList] = useState([]);

    const searchMentor = () => {
        Axios.post('http://127.0.0.1:3001/searchmentor', {
            skill: skill,
        }).then((response) => {
            setMentorSearchList(response.data);
        });
    }

    const doRequest = (mentor) => {
        Axios.post('http://127.0.0.1:3001/dorequest', {
            mentor: mentor,
            mentee: sessionStorage.getItem("ID"),
            status: 0,
        }).then((response) => {
            alert("Request Sent");
        });
    }
    useState(() => {
        searchMentor()
    }, [])

    return (
        <div className="container">
            <div className="row g-3 my-4">
                <div className="col-md-9">
                    <select
                        className="form-select"
                        aria-label="Select skill"
                        onChange={(e) => setSkill(e.target.value)}
                        value={skill}
                    >
                        <option value="Maths">Maths</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Physics">Physics</option>
                        <option value="Biology">Biology</option>
                        <option value="Computer">Computer</option>
                        <option value="EVS">EVS</option>
                        <option value="Social">Social</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={searchMentor}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mentorSearchList.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-3 text-muted">
                                    No mentor found
                                </td>
                            </tr>
                        ) : (
                            mentorSearchList.map((data, key) => (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.gender ? 'Male' : 'Female'}</td>
                                    <td>{data.age}</td>
                                    <td>
                                        <span className="d-inline-flex align-items-center">
                                            {data.rating}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-warning ms-1" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => doRequest(data.id)}
                                        >
                                            Request
                                        </button>
                                    </td>
                                </tr>
                            )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MentorSearch;