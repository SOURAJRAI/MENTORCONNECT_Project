import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Trash2, User, Mail, Phone } from 'lucide-react';

function MenteeList() {

    const [requestList, setRequestList] = useState([]);

    const getMyRequets = () => {
        Axios.post("http://127.0.0.1:3001/getmenteelist", {
            mentor: sessionStorage.getItem("ID"),
        }).then((response) => {
            setRequestList(response.data)
        });
    }

    useEffect(() => {
        getMyRequets();
    }, []);

    const deleteRequest = (id) => {
        if (window.confirm("Are you sure want to make this action ?") === true) {
            Axios.post("http://127.0.0.1:3001/delreq", {
                id: id,
            }).then((response) => {
                getMyRequets();
            });
        }
    }

    return (
        <div className="container py-5">
            <div className="row g-4">
                <div className="col-12">
                    <h1 className="display-4 mb-0 text-primary">Mentee List</h1>
                </div>
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="border-0 px-4 py-3">#</th>
                                            <th className="border-0 px-4 py-3">Name</th>
                                            <th className="border-0 px-4 py-3">Email Address</th>
                                            <th className="border-0 px-4 py-3">Phone Number</th>
                                            <th className="border-0 px-4 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requestList.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5 text-muted">
                                                    No mentees found
                                                </td>
                                            </tr>
                                        ) : (
                                            requestList.map((data, key) => (
                                                <tr key={data.reqid}>
                                                    <td className="px-4 py-3">{key + 1}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="d-flex align-items-center">
                                                            <User size={18} className="text-primary me-2" />
                                                            {data.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="d-flex align-items-center">
                                                            <Mail size={18} className="text-muted me-2" />
                                                            {data.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="d-flex align-items-center">
                                                            <Phone size={18} className="text-muted me-2" />
                                                            {data.phone}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() => deleteRequest(data.reqid)}
                                                        >
                                                            <Trash2 size={16} className="me-2" />
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default MenteeList;