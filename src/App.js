import React, { useState } from 'react';
import DatePickerComponent from './DatePickerComponent';
import './index.css';

const App = () => {
  const septemberAvailability = [
    "2024-09-03", "2024-09-04", "2024-09-10",
    "2024-09-11", "2024-09-17", "2024-09-24", "2024-09-25"
  ];
  
  const augustAvailability = [
    "2024-08-19", "2024-08-22", "2024-08-24",
    "2024-08-26", "2024-08-30"
  ]; 

  const availability = septemberAvailability.concat(augustAvailability);

  return (
    <div className="container">
      <h1>Book your Appointment</h1>
      <p>See below the days when Dr. Harding is available for Annual Physicals.</p>

      <div className="date-picker-container">
        <DatePickerComponent availability={availability} />
      </div>

      <div className="icon-legend">
        <div className="icon"></div>
        <span className="legend-text">: Days with available appointments</span>
      </div>
    </div>
  );
};

export default App;

