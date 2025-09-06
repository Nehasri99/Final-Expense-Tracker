import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleSuccess } from '../../utils';

function Header({ onFilter }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser') || 'User';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out 👋');
        setTimeout(() => navigate('/login'), 1000);
    };
    
    const handleFilterClick = () => {
        if (!startDate || !endDate) {
            return toast.warn("Please select both start and end dates.");
        }
        if (new Date(startDate) > new Date(endDate)) {
            return toast.warn("Start date cannot be after end date.");
        }
        onFilter(startDate, endDate);
    };

    return (
        <div className="card user-section">
            <div className="header-top">
                <h1>Welcome {loggedInUser}</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
            <div className="filter-controls">
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={handleFilterClick}>Filter</button>
            </div>
        </div>
    );
}

export default Header;