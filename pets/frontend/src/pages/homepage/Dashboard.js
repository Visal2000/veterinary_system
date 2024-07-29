import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const activities = [
    'Tommy - 2:00 PM',
    'Tommy - 2:00 PM',
    'Alex Morgan - 2:00 PM',
    'John Doe - 2:00 PM'
  ];

  const filteredActivities = activities.filter(activity =>
    activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="metrics">
        <div className="metric">Total Pets :2054</div>
        <div className="metric">Total Doctors : 1001</div>
        <div className="metric">Appointments : 506</div>
      </div>

      <div className="recent-patients">
        <h3>Recent Registrations</h3>
        <input
          type="text"
          className="search-bar"
          placeholder="Search activities..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul>
          {filteredActivities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
