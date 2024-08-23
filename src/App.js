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

// Show available dates
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePickerComponent from './DatePickerComponent';
// import './index.css';

// const App = () => {
//   const [availability, setAvailability] = useState([]);
//   const [jwtToken, setJwtToken] = useState('');

//   // Step 1: Create JWT Token
//   const createJWTToken = async () => {
//     try {
//       const response = await axios.post(
//         'https://sf-function.scheduling.athena.io/v1/graphql',
//         {
//           query: `
//             mutation createConsumerWorkflowToken($locationId: String!) {
//               createConsumerWorkflowToken(locationId: $locationId) {
//                 token
//               }
//             }
//           `,
//           variables: {
//             locationId: "21276-1",
//           },
//         }
//       );

//       const token = response?.data?.data?.createConsumerWorkflowToken?.token;
//       if (token) {
//         setJwtToken(token); // Store the JWT token in state
//         return token;
//       } else {
//         console.error('JWT token not found in the response:', response);
//         return null;
//       }

//     } catch (error) {
//       console.error('Error creating JWT token:', error);
//       return null;
//     }
//   };

//   // Step 2: Search Availability Dates
//   const fetchAvailability = async (token) => {
//     try {
//       const fixedValues = {
//         patientNewness: "scheduling.athena.io/enumeration/patientnewness/generalestablished",
//         specialty: "codesystem.scheduling.athena.io/specialty.canonical|Naturopathic Medicine",
//         serviceTypeTokens: ["codesystem.scheduling.athena.io/servicetype.canonical|03d9d312-3cf8-11e8-b467-0ed5f89f718b"]
//       };

//       const response = await axios.post(
//         'https://sf-function.scheduling.athena.io/v1/graphql',
//         {
//           query: `
//             query SearchAvailabilityDates(
//               $locationIds: [String!], 
//               $practitionerIds: [String!], 
//               $patientNewness: String, 
//               $specialty: String, 
//               $serviceTypeTokens: [String!]!, 
//               $startAfter: String!, 
//               $startBefore: String!, 
//               $visitType: VisitType, 
//               $page: Int, 
//               $practitionerCategory: PractitionerCategory
//             ) {
//               searchAvailabilityDates(
//                 locationIds: $locationIds, 
//                 practitionerIds: $practitionerIds, 
//                 patientNewness: $patientNewness, 
//                 specialty: $specialty, 
//                 serviceTypeTokens: $serviceTypeTokens, 
//                 startAfter: $startAfter, 
//                 startBefore: $startBefore, 
//                 visitType: $visitType, 
//                 page: $page, 
//                 practitionerCategory: $practitionerCategory
//               ) {
//                 date
//                 availability
//                 __typename
//               }
//             }
//           `,
//           variables: {
//             locationIds: ["21276-1"],  
//             practitionerIds: ["21276-1"],  
//             patientNewness: fixedValues.patientNewness,
//             specialty: fixedValues.specialty,
//             serviceTypeTokens: fixedValues.serviceTypeTokens,
//             startAfter: "2024-08-20",
//             startBefore: "2024-09-30",
//             page: 1,
//           },
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-scheduling-jwt': token,
//           },
//         }
//       );

//       if (response?.data?.data?.searchAvailabilityDates) {
//         const availableDates = response.data.data.searchAvailabilityDates
//           .filter(dateInfo => dateInfo.availability)
//           .map(dateInfo => dateInfo.date);

//         setAvailability(availableDates);
//       } else {
//         console.error('No data returned from the API.');
//       }
//     } catch (error) {
//       console.error('Error fetching availability data:', error);
//     }
//   };

//   useEffect(() => {
//     const initializeApp = async () => {
//       const token = await createJWTToken();
//       if (!token) return;

//       await fetchAvailability(token);
//     };

//     initializeApp();
//   }, []);

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
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
        setJwtToken(token);
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

  // Step 2: Fetch available dates
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
          variables: 
          {
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
          headers: 
          {
            'Content-Type': 'application/json',
            'x-scheduling-jwt': token,
          },
        }
      );

      if (response?.data?.data?.searchAvailabilityDates) 
      {
        const availableDates = response.data.data.searchAvailabilityDates
          .filter(dateInfo => dateInfo.availability)
          .map(dateInfo => dateInfo.date);

        setAvailability(availableDates);
      } 
      
      else 
      {
        console.error('No data returned from the API.');
      }
    } 
    catch (error) 
    {
      console.error('Error fetching availability data:', error);
    }
  };

  // Step 3: Fetch available times for a specific date
  const fetchAvailableTimes = async (date) => {
    try {
      const response = await axios.post(
        'https://sf-function.scheduling.athena.io/v1/graphql',
        {
          query: `
            query SearchSlots(
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
              searchSlots(
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
                scheduleAvailabilitySlots {
                  practitionerAvailability {
                    availability {
                      start
                    }
                  }
                }
              }
            }
          `,
          variables: 
          {
            locationIds: ["21276-1"],
            practitionerIds: ["21276-1"],
            patientNewness: "scheduling.athena.io/enumeration/patientnewness/generalestablished",
            specialty: "codesystem.scheduling.athena.io/specialty.canonical|Naturopathic Medicine",
            serviceTypeTokens: ["codesystem.scheduling.athena.io/servicetype.canonical|03d9d312-3cf8-11e8-b467-0ed5f89f718b"],
            startAfter: `${date}T00:00:00-07:00`,
            startBefore: `${date}T23:59:59-07:00`,
            page: 1,
          },
        },
        {
          headers: 
          {
            'Content-Type': 'application/json',
            'x-scheduling-jwt': jwtToken,
          },
        }
      );

      if (response?.data?.data?.searchSlots?.scheduleAvailabilitySlots) {
        const times = response.data.data.searchSlots.scheduleAvailabilitySlots
          .flatMap(slot => slot.practitionerAvailability.flatMap(pa => pa.availability.map(a => a.start)));

        setAvailableTimes(times);
      } 
      else {
        console.error('No times returned from the API.');
      }
    } catch (error) {
      console.error('Error fetching available times:', error);
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

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimes(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="container">
      <h1>Book your Appointment</h1>
      <p>See below the days when Dr. Harding is available for Annual Physicals.</p>

      <div className="date-picker-container">
        <DatePickerComponent availability={availability} onDateChange={setSelectedDate} />
      </div>

      {selectedDate && (
        <>
          <h2>Available times on {selectedDate} with Dr. Aubrey Harding:</h2>
          <div className="time-buttons">
            {availableTimes.length > 0 ? (
              availableTimes.map((time, index) => (
                <button key={index} className="time-button">
                  {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </button>
              ))
            ) : (
              <p>No available times for this date. Try different search parameters or a different date.</p>
            )}
          </div>
        </>
      )}

      <div className="icon-legend">
        <div className="icon"></div>
        <span className="legend-text">: Days with available appointments</span>
      </div>
    </div>
  );
};

export default App;
