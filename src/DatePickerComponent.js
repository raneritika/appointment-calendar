import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css';

const DatePickerComponent = ({ availability }) => {

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      return availability.includes(formattedDate) ? 'available-day' : null;
    }
  };

  const defaultActiveStartDate = new Date(2024, 8, 1); // Start on September

  return (
    <div className="datepicker-container">
      <Calendar
        defaultActiveStartDate={defaultActiveStartDate}
        tileClassName={tileClassName}
        minDetail="month"
        maxDetail="month"
        showNeighboringMonth={false}
        navigationLabel={({ date }) => date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        prev2Label={null}  // Removes the `«` button for year
        next2Label={null}  // Removes the `»` button for year
        minDate={new Date(2024, 7, 1)} // Restrict to start of August
        maxDate={new Date(2024, 8, 30)} // Restrict to end of September
      />
    </div>
  );
};

export default DatePickerComponent;
