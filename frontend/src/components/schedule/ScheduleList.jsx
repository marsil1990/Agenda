import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScheduleList = ({ schedule, loading, error, onReserve, onLogout, isAdmin, reserved }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  if (loading) return <div>Loading schedules...</div>;
  if (error) return <div>Error loading schedules: {error}</div>;

  return (
    <div>
      <div className="button-container">
        <button className="logout-button" onClick={onLogout}>Logout</button>
        {isAdmin && <button onClick={() => navigate('/reservations')}>Manage Reservations</button>}
      </div>
      
      <div className="container">
        <h2>Available Time Slots</h2>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          disabled={!schedule.length}
        >
          <option value="">Select a time slot</option>
          {schedule.map(([day, month, year, hour], index) => (
            <option key={index} value={[day, month, year, hour]}>
              {`${day}/${month}/${year} - ${hour}`}
            </option>
          ))}
        </select>

        {selectedOption && (
          <div className="confirmation-dialog">
            <p>Selected: {selectedOption.replaceAll(',', ' / ')}</p>
            <div className="action-buttons">
              <button onClick={() => setSelectedOption('')}>Cancel</button>
              <button onClick={() => onReserve(selectedOption.split(','))}>Confirm</button>
            </div>
           {reserved ? <h3>Successfully reserved!</h3>: <h3>An error has occurred</h3> }
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleList;