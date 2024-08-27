import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomeNavbar from '../../components/HomeNavbar';
import MentorSideNav from '../../components/MentorSideNav';
import Feedbacks from './Feedbacks';
import MenteeList from './MenteeList';
import MenteeRequests from './MenteeRequests';
import MentorChat from './MentorChat';
import MentorInfo from './MentorInfo';
import MentorDocument from './MentorDocument';

function Mentor() {

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("ISLOGIN") !== "valid") {
            navigate("/");
        }
    }, []);

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <HomeNavbar />
            <div className="flex-grow-1 d-flex">
                <div className="sidebar bg-white shadow-sm border-end" style={{ width: '250px' }}>
                    <MentorSideNav />
                </div>
                <main className="flex-grow-1 p-4 overflow-auto">
                    <div className="container-fluid">
                        <Routes>
                            <Route path="/" element={<MenteeRequests />} />
                            <Route path="/mentee" element={<MenteeList />} />
                            <Route path="/chat" element={<MentorChat />} />
                            <Route path="/document" element={<MentorDocument />} />
                            <Route path="/feedback" element={<Feedbacks />} />
                            <Route path="/details" element={<MentorInfo />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Mentor;