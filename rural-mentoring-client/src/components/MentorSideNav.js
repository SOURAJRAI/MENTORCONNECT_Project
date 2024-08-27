import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, MessageSquare, FileText, StarHalf, User } from 'lucide-react';

function MentorSideNav() {
    const navItems = [
        { to: "/mentor", icon: Home, label: "Home" },
        { to: "/mentor/mentee", icon: Users, label: "Mentee List" },
        { to: "/mentor/chat", icon: MessageSquare, label: "Chat" },
        { to: "/mentor/document", icon: FileText, label: "Document" },
        { to: "/mentor/feedback", icon: StarHalf, label: "Feedback" },
        { to: "/mentor/details", icon: User, label: "Profile" }
    ];
    return (
        <div className="d-flex flex-column h-100 bg-white shadow-sm border-end">
            <div className="p-3">
                {/* <h5 className="text-muted mb-3 px-3">Menu</h5> */}
                <nav className="nav flex-column">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.to}
                            className={({ isActive }) => `
                  nav-link py-3 px-4 rounded-3 mb-2 d-flex align-items-center
                  ${isActive ? 'bg-primary text-white' : 'text-dark'}
                  hover-effect transition
                `}
                        >
                            <item.icon size={18} className="me-3" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default MentorSideNav;