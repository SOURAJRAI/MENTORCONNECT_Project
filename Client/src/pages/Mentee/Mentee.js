import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomeNavbar from '../../components/HomeNavbar';
import MenteeSideNav from '../../components/MenteeSideNav';
import MenteeInfo from './MenteeInfo';
import MentorSearch from './MentorSearch';
import MentorList from './MentorList';
import Feedback from './Feedback';
import MenteeChat from './MenteeChat';
import MenteeDocument from './MenteeDocument';

function Mentee() {

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
                    <MenteeSideNav />
                </div>
                <main className="flex-grow-1 p-4 overflow-auto">
                    <div className="container-fluid">
                        <Routes>
                            <Route path="/" element={<MentorSearch />} />
                            <Route path="/mentor" element={<MentorList />} />
                            <Route path="/feedback" element={<Feedback />} />
                            <Route path="/chat" element={<MenteeChat />} />
                            <Route path="/document" element={<MenteeDocument />} />
                            <Route path="/details" element={<MenteeInfo />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Mentee;