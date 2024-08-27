import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Upload, FileText, Eye } from 'lucide-react';

function MentorDocument() {
    const [requestList, setRequestList] = useState([]);

    // store person b details
    const [chatId, setChatId] = useState("");
    const [chatName, setChatName] = useState("");
    const [chatEmail, setChatEmail] = useState("");
    const [chatPhone, setChatPhone] = useState("");

    const [docList, setDocList] = useState([]);

    const [chatMessage, setChatMessage] = useState("");

    const getMyRequets = () => {
        Axios.post("http://127.0.0.1:3001/getmenteelist", {
            mentor: sessionStorage.getItem("ID"),
        }).then((response) => {
            const data = response.data;
            if (data.length > 0) {
                setRequestList(response.data);
                setChatId(data[0].id);
                setChatName(data[0].name);
                setChatEmail(data[0].email);
                setChatPhone(data[0].phone);
            }
        });
    }
    const [docFile, setDocFile] = useState();
    const [docFileName, setDocFileName] = useState("");

    const saveDocFile = (e) => {
        setDocFile(e.target.files[0]);
        setDocFileName(e.target.files[0].name);
    };

    const uploadDoc = () => {
        const formData = new FormData();
        formData.append("from_user", sessionStorage.getItem("ID") + sessionStorage.getItem("PHONE"));
        formData.append("to_user", chatId + chatPhone);
        formData.append("docFileName", docFileName);
        formData.append("docFile", docFile);

        Axios.post("http://127.0.0.1:3001/upload-document", formData).then((response) => {
            setChatMessage("");
            console.log("success");
        });
    }
    const getRequestedChat = (id, phone) => {
        Axios.post("http://127.0.0.1:3001/getDocument", {
            from_user: sessionStorage.getItem("ID") + sessionStorage.getItem("PHONE"),
            to_user: id + phone
        }).then((response) => {
            setDocList(response.data)
        });
    }
    const getChat = (id, name, email, phone) => {
        setChatName(name);
        setChatEmail(email);
        setChatPhone(phone);
        setChatId(id);
        getRequestedChat(id, phone);
    }
    useEffect(() => {
        getRequestedChat(chatId, chatPhone);
    }, [docList]);
    useEffect(() => {
        getMyRequets();
    }, []);

    return <div className="container-fluid py-1">
        <div className="row g-4">
            <div className="col-lg-4 col-md-5">
                <h3 className="mb-4">Recent Uploads</h3>
                <div className="list-group">
                    {requestList.map((data, key) => (
                        <button
                            key={key}
                            className="list-group-item list-group-item-action d-flex align-items-center p-3 mb-2 rounded-3 shadow-sm border-0"
                            onClick={() => getChat(data.id, data.name, data.email, data.phone)}
                        >
                            <div className="flex-grow-1">
                                <h5 className="mb-1 fw-bold">{data.name}</h5>
                                <p className="mb-1 small text-muted"><i>Class {data.class}</i></p>
                                <p className="mb-0 small">{data.email}</p>
                            </div>
                            <FileText className="ms-3 text-primary" size={24} />
                        </button>
                    ))}
                </div>
            </div>

            <div className="col-lg-8 col-md-7">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <div className="alert alert-primary mb-4">
                            <h5 className="alert-heading mb-1">{chatName}</h5>
                            <p className="mb-0 small">{chatEmail}</p>
                        </div>

                        <div className="overflow-auto mb-4" style={{ height: '60vh' }}>
                            {docList.map((data, key) => (
                                <div key={key} className="card mb-3 border-0 shadow-sm">
                                    <div className="card-body">
                                        <p className="mb-3"><i>{data.document}</i></p>
                                        <a
                                            className="btn btn-outline-primary btn-sm"
                                            href={`http://127.0.0.1:3001/documents/${data.document}`}
                                        >
                                            <Eye size={18} className="me-2" />
                                            View Document
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form className="mt-4" onSubmit={uploadDoc}>
                            <div className="input-group">
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={saveDocFile}
                                    required
                                />
                                <button type="submit" className="btn btn-primary">
                                    <Upload size={18} className="me-2" />
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default MentorDocument;