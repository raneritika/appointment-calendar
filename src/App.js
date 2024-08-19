// import React, { useState } from 'react';
// import DatePickerComponent from './DatePickerComponent';
// import './index.css';

// const App = () => {
//   const septemberAvailability = [
//     "2024-09-03", "2024-09-04", "2024-09-10",
//     "2024-09-11", "2024-09-17", "2024-09-24", "2024-09-25"
//   ];
  
//   const augustAvailability = [
//     "2024-08-19", "2024-08-22", "2024-08-24",
//     "2024-08-26", "2024-08-30"
//   ]; 

//   const availability = septemberAvailability.concat(augustAvailability);

//   return (
//     <div className="container">
//       <h1>Book your Appointment</h1>
//       <p>See below the days when Dr. Harding is available for Annual Physicals.</p>

//       <div className="date-picker-container">
//         <DatePickerComponent availability={availability} />
//       </div>

//       <div className="icon-legend">
//         <div className="icon"></div>
//         <span className="legend-text">: Days with available appointments</span>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePickerComponent from './DatePickerComponent';
import './index.css';

const App = () => {
  const [availability, setAvailability] = useState([]);
  const [jwtToken, setJwtToken] = useState('');

  // Step 1: Create JWT Token
  const createJWTToken = async () => {
    try {
      const response = await axios.post(
        'https://sf-function.scheduling.athena.io/v1/graphql',
        {
          query: `
            mutation createConsumerWorkflowToken($locationId: String!) {
              createConsumerWorkflowToken(locationId: $locationId) {
                token
              }
            }
          `,
          variables: {
            locationId: "21276-1",
          },
        }
      );

      const token = response?.data?.data?.createConsumerWorkflowToken?.token;
      if (token) {
        setJwtToken(token); // Store the JWT token in state
        return token;
      } else {
        console.error('JWT token not found in the response:', response);
        return null;
      }

    } catch (error) {
      console.error('Error creating JWT token:', error);
      return null;
    }
  };

  // Step 2: Search Availability Dates
  const fetchAvailability = async (token) => {
    try {
      const fixedValues = {
        patientNewness: "scheduling.athena.io/enumeration/patientnewness/generalestablished",
        specialty: "codesystem.scheduling.athena.io/specialty.canonical|Naturopathic Medicine",
        serviceTypeTokens: ["codesystem.scheduling.athena.io/servicetype.canonical|03d9d312-3cf8-11e8-b467-0ed5f89f718b"]
      };

      const response = await axios.post(
        'https://sf-function.scheduling.athena.io/v1/graphql',
        {
          query: `
            query SearchAvailabilityDates(
              $locationIds: [String!], 
              $practitionerIds: [String!], 
              $patientNewness: String, 
              $specialty: String, 
              $serviceTypeTokens: [String!]!, 
              $startAfter: String!, 
              $startBefore: String!, 
              $visitType: VisitType, 
              $page: Int, 
              $practitionerCategory: PractitionerCategory
            ) {
              searchAvailabilityDates(
                locationIds: $locationIds, 
                practitionerIds: $practitionerIds, 
                patientNewness: $patientNewness, 
                specialty: $specialty, 
                serviceTypeTokens: $serviceTypeTokens, 
                startAfter: $startAfter, 
                startBefore: $startBefore, 
                visitType: $visitType, 
                page: $page, 
                practitionerCategory: $practitionerCategory
              ) {
                date
                availability
                __typename
              }
            }
          `,
          variables: {
            locationIds: ["21276-1"],  
            practitionerIds: ["21276-1"],  
            patientNewness: fixedValues.patientNewness,
            specialty: fixedValues.specialty,
            serviceTypeTokens: fixedValues.serviceTypeTokens,
            startAfter: "2024-08-20",
            startBefore: "2024-09-30",
            page: 1,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-scheduling-jwt': token,
          },
        }
      );

      if (response?.data?.data?.searchAvailabilityDates) {
        const availableDates = response.data.data.searchAvailabilityDates
          .filter(dateInfo => dateInfo.availability)
          .map(dateInfo => dateInfo.date);

        setAvailability(availableDates);
      } else {
        console.error('No data returned from the API.');
      }
    } catch (error) {
      console.error('Error fetching availability data:', error);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      const token = await createJWTToken();
      if (!token) return;

      await fetchAvailability(token);
    };

    initializeApp();
  }, []);

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


