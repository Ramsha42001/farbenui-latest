// import React, { useState, lazy, Suspense } from 'react';
// import styles from '../styles/Dashboard.module.css';
// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';

// const Chart = lazy(() => import('react-apexcharts'));

// const cardData = [
//   { id: 1, title: 'Users' },
//   { id: 2, title: 'Sessions' },
//   { id: 3, title: 'Top Intents' },
//   { id: 4, title: 'Tokens Plot' },
//   { id: 5, title: 'Total Interactions' },
//   { id: 6, title: 'Unique users' },
//   { id: 7, title: 'Unique sessions' },
//   { id: 8, title: 'Interactions Line' },
//   { id: 9, title: 'Recognition Rate' },
// ];

// const dates = ["Jan 23", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"];
// const usersLatest = [0, 0, 4, 1, 2, 2, 3];
// const usersPrevious = [1, 0, 7, 0, 4, 2, 1];
// const sessionsLatest = [1, 0, 6, 1, 2, 2, 3];
// const sessionsPrevious = [0, 1, 7, 0, 4, 1, 0];
// const topIntents = ["Schedule Call", "How Do AI Assistants Work?", "What are AI Assistants?", "Book Appointment", "Get Weather", "Play Music"];
// const intentCounts = [5, 2, 1, 3, 4, 2];
// const tokensPerDay = [1500, 2800, 1100, 2300, 3200, 1800, 2500];
// const averageTokens = tokensPerDay.reduce((sum, val) => sum + val) / tokensPerDay.length;
// const interactions = [0, 1, 15, 7, 1, 0];
// const previousInteractions = [0, 15, 50, 20, 7, 0];
// const totalInteractions = 37;
// const uniqueUsers = 13;
// const uniqueSessions = 13;
// const recognitionRate = 66.7;
// const fallbackRate = 33.3;
// const primaryColor = "#19A0AA";
// const secondaryColor = "#EE7A47";
// const backgroundColor = "#F5F5F5";
// const CARDS_PER_PAGE = 4;

// const isSmallCard = (title) => {
//   if (title === 'Total Interactions' || title === 'Unique users' || title === 'Unique sessions')
//     return true;
//   else
//     return false;
// };

// function Dashboard() {
//   const [currentPage, setCurrentPage] = useState(1);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const getCurrentCards = () => {
//     if (currentPage === 1) {
//       return cardData.slice(0, CARDS_PER_PAGE);
//     } else {
//       return cardData.slice(CARDS_PER_PAGE);
//     }
//   };

//   const renderChart = (title) => {
//     const layoutSettings = {
//       chart: {
//         toolbar: {
//           show: false,
//         },
//       },
//       title: {
//         text: title,
//         align: 'center',
//         style: {
//           fontSize: '20px',
//           fontWeight: 'bold',
//         },
//       },
//       xaxis: {
//         show: true,
//         showAlways: true,
//         axisBorder: {
//           show: true,
//         },
//         axisTicks: {
//           show: true,
//         },
//       },
//       yaxis: {
//         show: true,
//         showAlways: true,
//         axisBorder: {
//           show: true,
//         },
//         axisTicks: {
//           show: true,
//         },
//       },
//       grid: {
//         show: false,
//       },
//     };

//     if (title === 'Users') {
//       const options = {
//         ...layoutSettings,
//         chart: {
//           ...layoutSettings.chart,
//           id: 'users-chart',
//           type: 'line',
//         },
//         xaxis: {
//           ...layoutSettings.xaxis,
//           categories: dates,
//         },
//         yaxis: {
//           ...layoutSettings.yaxis,
//           min: 0,
//           max: Math.max(...usersLatest) + Math.max(...usersPrevious),
//         },
//         colors: ['#FFD700', '#4682B4'],
//         stroke: {
//           width: 3,
//         },
//       };

//       const series = [
//         {
//           name: 'Latest',
//           data: usersLatest,
//         },
//         {
//           name: 'Previous',
//           data: usersPrevious,
//         },
//       ];

//       return <Chart options={options} series={series} type="line" height={400} />;
//     } else if (title === 'Sessions') {
//       const options = {
//         ...layoutSettings,
//         chart: {
//           ...layoutSettings.chart,
//           id: 'sessions-chart',
//           type: 'line',
//         },
//         xaxis: {
//           ...layoutSettings.xaxis,
//           categories: dates,
//         },
//         yaxis: {
//           ...layoutSettings.yaxis,
//           min: 0,
//           max: Math.max(...sessionsLatest) + Math.max(...sessionsPrevious),
//         },
//         colors: ['#DC143C', '#B0C4DE'],
//         stroke: {
//           width: 3,
//         },
//       };

//       const series = [
//         {
//           name: 'Sessions - Latest',
//           data: sessionsLatest,
//         },
//         {
//           name: 'Sessions - Previous',
//           data: sessionsPrevious,
//         },
//       ];

//       return <Chart options={options} series={series} type="line" height={400} />;
//     } else if (title === 'Top Intents') {
//       const options = {
//         ...layoutSettings,
//         chart: {
//           ...layoutSettings.chart,
//           id: 'top-intents-chart',
//           type: 'bar',
//         },
//         plotOptions: {
//           bar: {
//             horizontal: true,
//             dataLabels: {
//               position: 'top',
//             },
//           },
//         },
//         dataLabels: {
//           enabled: true,
//           offsetX: -6,
//           style: {
//             fontSize: '12px',
//             colors: ['#fff']
//           }
//         },
//         xaxis: {
//           ...layoutSettings.xaxis,
//           categories: topIntents,
//         },
//         colors: ['#4169E1', '#FFD700', '#20B2AA', '#D87093', '#6495ED', '#FFA500'],
//       };

//       const series = [
//         {
//           data: intentCounts,
//         },
//       ];

//       return <Chart options={options} series={series} type="bar" height={400} />;
//     } else if (title === 'Tokens Plot') {
//       const options = {
//         ...layoutSettings,
//         chart: {
//           ...layoutSettings.chart,
//           id: 'tokens-plot-chart',
//           type: 'line',
//         },
//         xaxis: {
//           ...layoutSettings.xaxis,
//           categories: dates,
//         },
//         yaxis: {
//           ...layoutSettings.yaxis,
//           min: 0,
//           max: Math.max(...tokensPerDay) + 500,
//         },
//         colors: ['#228B22', 'red'],
//         stroke: {
//           width: [3, 2],
//           dashArray: [0, 4],
//         },
//         markers: {
//           size: [8, 0],
//         },
//       };

//       const series = [
//         {
//           name: 'Tokens',
//           data: tokensPerDay,
//         },
//         {
//           name: 'Average',
//           data: Array(dates.length).fill(averageTokens),
//         },
//       ];

//       return <Chart options={options} series={series} type="line" height={400} />;
//     } else if (title === 'Total Interactions') {
//       const options = {
//         ...layoutSettings,
//         chart: {
//           ...layoutSettings.chart,
//           id: 'total-interactions-chart',
//           type: 'radialBar',
//         },
//         plotOptions: {
//           radialBar: {
//             hollow: {
//               size: '70%',
//             },
//             dataLabels: {
//               name: {
//                 show: true,
//                 fontSize: '20px',
//                 fontWeight: 'bold',
//                 color: '#000',
//               },
//               value: {
//                 fontSize: '40px',
//                 color: primaryColor,
//                 show: true,
//                 formatter: function (val) {
//                   return val
//                 },
//               },
//             }
//           },
//         },
//         labels: ['Interactions'],
//         colors: [primaryColor],
//       };

//       const series = [totalInteractions];

//       return <Chart options={options} series={series} type="radialBar" height={300} />;
//     } else if (title === 'Unique users') {
//       const options = {
//         ...layoutSettings,
//         chart: {
//           ...layoutSettings.chart,
//           id: 'unique-users-chart',
//           type: 'radialBar',
//         },
//         plotOptions: {
//           radialBar: {
//             hollow: {
//               size: '70%',
//             },
//             dataLabels: {
//               name: {
//                 show: true,
//                 fontSize: '20px',
//                 fontWeight: 'bold',
//                 color: '#000',
//               },
//               value: {
//                 fontSize: '40px',
//                 color: primaryColor,
//                 show: true,
//                 formatter: function (val) {
//                   return val
//                 },
//               },
//             }
//           },
//         },
//         labels: ['Unique Users'],
//         colors: [primaryColor],
//       };

//       const series = [uniqueUsers];

//       return <Chart options={options} series={series} type="radialBar" height={300} />;
//     } else if (title === 'Unique sessions') {
//       const options = {
//         ...layoutSettings,
//         chart: {
//           ...layoutSettings.chart,
//           id: 'unique-sessions-chart',
//           type: 'radialBar',
//         },
//         plotOptions: {
//           radialBar: {
//             hollow: {
//               size: '70%',
//             },
//             dataLabels: {
//               name: {
//                 show: true,
//                 fontSize: '20px',
//                 fontWeight: 'bold',
//                 color: '#000',
//               },
//               value: {
//                 fontSize: '40px',
//                 color: primaryColor,
//                 show: true,
//                 formatter: function (val) {
//                   return val
//                 },
//               },
//             }
//           },
//         },
//         labels: ['Unique Sessions'],
//         colors: [primaryColor],
//       };

//       const series = [uniqueSessions];

//       return <Chart options={options} series={series} type="radialBar" height={300} />;
//     } else if (title === 'Interactions Line') {
//       const options = {
//         ...layoutSettings,
//         chart: {
//           ...layoutSettings.chart,
//           id: 'interactions-line-chart',
//           type: 'line',
//         },
//         xaxis: {
//           ...layoutSettings.xaxis,
//           categories: dates,
//         },
//         colors: [primaryColor, 'black'],
//         stroke: {
//           width: [3, 2],
//           dashArray: [0, 4],
//         },
//         markers: {
//           size: [8, 0],
//         },
//       };

//       const series = [
//         {
//           name: 'Latest',
//           data: interactions,
//         },
//         {
//           name: 'Previous',
//           data: previousInteractions,
//         },
//       ];

//       return <Chart options={options} series={series} type="line" height={400} />;
//     } else if (title === 'Recognition Rate') {
//       const options = {
//         ...layoutSettings,
//         chart: {
//           ...layoutSettings.chart,
//           id: 'recognition-rate-chart',
//           type: 'donut',
//         },
//         labels: ["Recognized", "AI Fallback"],
//         colors: [primaryColor, secondaryColor],
//         dataLabels: {
//           enabled: true,
//           formatter: function (val, opts) {
//             return opts.w.config.labels[opts.seriesIndex] + ": " + val.toFixed(1) + '%'
//           },
//         },
//         legend: {
//           show: true,
//           position: 'bottom',
//         },
//         plotOptions: {
//           pie: {
//             donut: {
//               labels: {
//                 show: true,
//                 total: {
//                   show: true,
//                   label: 'Total',
//                   formatter: function (w) {
//                     return w.globals.seriesTotals.reduce((a, b) => {
//                       return a + b
//                     }, 0).toFixed(1) + '%'
//                   },
//                 },
//               }
//             }
//           }
//         },
//       };

//       const series = [recognitionRate, fallbackRate];

//       return <Chart options={options} series={series} type="donut" height={400} />;
//     }
//   };

//   return (
//     <>
//       <div>
//         <Header />
//       </div>
//       <div>
//         <Sidebar />
//       </div>
//       <div className={styles.cardContainer}>
//         <div className={styles.pagination}>
//           <button
//             onClick={() => handlePageChange(1)}
//             disabled={currentPage === 1}
//             className={`${styles.button}`}
//           >
//             Assistant Analytics Dashboard
//           </button>
//           <button
//             onClick={() => handlePageChange(2)}
//             disabled={currentPage === 2}
//             className={`${styles.button}`}
//           >
//             Conversational Analytics Dashboard
//           </button>
//         </div>
//         <Suspense fallback={<div>Loading charts...</div>}>
//           <div className={styles.graphsContainer}>
//             {getCurrentCards().map((card) => (
//               <div key={card.id} className={isSmallCard(card.title) ? styles.card : styles.card}>
//                 {renderChart(card.title)}
//               </div>
//             ))}
//           </div>
//         </Suspense>
//       </div>
//     </>
//   );
// }

// export default Dashboard;
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashCss from '../styles/Dashboard.module.css';
import { Link, Outlet } from 'react-router-dom';
import { cardData, dates, usersLatest, usersPrevious, sessionsLatest, sessionsPrevious, topIntents, intentCounts, tokensPerDay, averageTokens, interactions, previousInteractions, totalInteractions, uniqueUsers, uniqueSessions, recognitionRate, fallbackRate, primaryColor, secondaryColor, backgroundColor, CARDS_PER_PAGE } from '../app/Data/DashboardData';

function Dashboard() {
const [activeLink, setActiveLink] = useState('Assistant Analytics');

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Sidebar />
      </div>
      <div className={DashCss.container}>
        <h1 className={DashCss.title}>Analytics</h1>
        <div className={DashCss.cardContainer}>
        
          <Link
            to="/dashboard/conversation"
            className={activeLink === 'Conversation Analytics' ? DashCss.activeLink : DashCss.link}
            onClick={() => setActiveLink('Conversation Analytics')}
          >
            Conversation Analytics
          </Link>

          <Link
            to="/dashboard/assistant"
            className={activeLink === 'Assistant Analytics' ? DashCss.activeLink : DashCss.link}
            onClick={() => setActiveLink('Assistant Analytics')}
          >
            Assistant Analytics
          </Link>
          <Link
            to="/dashboard/user"
            className={activeLink === 'User Analytics' ? DashCss.activeLink : DashCss.link}
            onClick={() => setActiveLink('User Analytics')}
          >
            User Analytics
          </Link>
          {/* <Link
            to="/dashboard/performance"
            className={activeLink === 'Performance Analytics' ? DashCss.activeLink : DashCss.link}
            onClick={() => setActiveLink('Performance Analytics')}
          >
            Performance Analytics
          </Link> */}
        </div>
        {/* Add the Outlet component to render nested routes */}

          <Outlet />

      </div>
    </>
  );
}

export default Dashboard;
