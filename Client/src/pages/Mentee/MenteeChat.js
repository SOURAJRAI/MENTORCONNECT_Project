import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function MenteeChat() {

    const [requestList, setRequestList] = useState([]);

    // store person b details
    const [chatId, setChatId] = useState("");
    const [chatName, setChatName] = useState("");
    const [chatEmail, setChatEmail] = useState("");
    const [chatPhone, setChatPhone] = useState("");

    const [chatList, setChatList] = useState([]);

    const [chatMessage, setChatMessage] = useState("");

    const getMyRequets = () => {
        Axios.post("http://127.0.0.1:3001/getmentorlist", {
            mentee: sessionStorage.getItem("ID"),
        }).then((response) => {
            if (response.data.length > 0) {
                setRequestList(response.data);
                setChatId(response.data[0].id);
                setChatName(response.data[0].name);
                setChatEmail(response.data[0].email);
                setChatPhone(response.data[0].phone);
            }

        });
    }

    const getRequestedChat = (id, phone) => {
        Axios.post("http://127.0.0.1:3001/getchats", {
            from_user: sessionStorage.getItem("ID") + sessionStorage.getItem("PHONE"),
            to_user: id + phone
        }).then((response) => {
            setChatList(response.data)
        });
    }

    const sendChat = () => {
        Axios.post("http://127.0.0.1:3001/sendchat", {
            from_user: sessionStorage.getItem("ID") + sessionStorage.getItem("PHONE"),
            to_user: chatId + chatPhone,
            chat: chatMessage
        }).then((response) => {
            setChatMessage("");
            console.log("success");
        });
    }

    useEffect(() => {
        getMyRequets();
    }, []);

    useEffect(() => {
        getRequestedChat(chatId, chatPhone);
    }, [chatList]);

    const getChat = (id, name, email, phone) => {
        setChatName(name);
        setChatEmail(email);
        setChatPhone(phone);
        setChatId(id);
        getRequestedChat(id, phone);
    }

    return (
        <div className="container-fluid py-1">
            <div className="row g-4">
                <div className="col-lg-6">
                    <h3 className="mb-4">Recent Chats</h3>
                    {requestList.length ? (
                        <div className="list-group">
                            {requestList.map((data, key) => (
                                <button
                                    key={key}
                                    className="list-group-item list-group-item-action d-flex align-items-center p-3 mb-2 rounded-3 shadow-sm"
                                    onClick={() => getChat(data.id, data.name, data.email, data.phone)}
                                >
                                    <div className="flex-shrink-0 me-3">
                                        <div className="avatar bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px' }}>
                                            <span className="fs-5">{data.name.charAt(0)}</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">{data.name}</h5>
                                        <p className="mb-1 small text-muted">{data.email}</p>
                                        <p className="mb-0 small text-muted">{data.skill}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted">No recent chats available.</div>
                    )}
                </div>

                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-bottom">
                            <h5 className="card-title text-primary mb-1">{chatName}</h5>
                            <p className="card-subtitle text-muted mb-0 small">{chatEmail}</p>
                        </div>
                        <div className="card-body p-0">
                            <div className="chat-window p-3" style={{ height: '68vh', overflowY: 'auto' }}>
                                {chatList.length ? (
                                    chatList.map((data, key) => (
                                        data.from_user === sessionStorage.getItem("ID") + sessionStorage.getItem("PHONE") ? (
                                            <div key={key} className="d-flex justify-content-end mb-3">
                                                <div className="bg-primary text-white p-2 rounded-3 shadow-sm" style={{ maxWidth: '75%' }}>
                                                    <p className="mb-0 small">{data.chat}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div key={key} className="d-flex mb-3">
                                                <div className="bg-light text-dark p-2 rounded-3 shadow-sm" style={{ maxWidth: '75%' }}>
                                                    <p className="mb-0 small">{data.chat}</p>
                                                </div>
                                            </div>
                                        )
                                    ))
                                ) : (
                                    <div className="text-center text-muted">No messages yet.</div>
                                )}
                            </div>
                        </div>
                        <div className="card-footer bg-white border-top">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    placeholder="Type a message..."
                                />
                                <button className="btn btn-primary" type="button" onClick={sendChat}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenteeChat;