import React, { lazy, Suspense } from 'react';
import {
  userData,
  userAcquisitionData,
  userActivityDates,
  userActivityData,
  primaryColor,
  secondaryColor,
} from '../../app/Data/DashboardData';
import UserCSS from '../../styles/User.module.css';

const Chart = lazy(() => import('react-apexcharts'));

const UserAnalytics = () => {
  const renderUserChart = (title) => {
    const layoutSettings = {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        text: title,
        align: 'center',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#333',
        },
      },
      xaxis: {
        show: true,
        showAlways: true,
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
      },
      yaxis: {
        show: true,
        showAlways: true,
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
      },
      grid: {
        show: false,
      },
    };

    if (title === 'User Growth') {
      const options = {
        ...layoutSettings,
        chart: {
          ...layoutSettings.chart,
          id: 'user-growth-chart',
          type: 'line',
        },
        xaxis: {
          ...layoutSettings.xaxis,
          categories: userData.dates,
        },
        yaxis: {
          ...layoutSettings.yaxis,
          min: 0,
          max: Math.max(...userData.activeUsers) + 10,
        },
        colors: [primaryColor],
        stroke: {
          width: 3,
        },
      };

      const series = [
        {
          name: 'Active Users',
          data: userData.activeUsers,
        },
      ];

      return (
        <Suspense fallback={<div className={UserCSS.loading}>Loading...</div>}>
          <Chart options={options} series={series} type="line" height={350} />
        </Suspense>
      );
    } else if (title === 'User Acquisition') {
      const options = {
        ...layoutSettings,
        chart: {
          ...layoutSettings.chart,
          id: 'user-acquisition-chart',
          type: 'bar',
        },
        xaxis: {
          ...layoutSettings.xaxis,
          categories: userAcquisitionData.sources,
        },
        yaxis: {
          ...layoutSettings.yaxis,
          min: 0,
          max: Math.max(...userAcquisitionData.users) + 5,
        },
        colors: [primaryColor, secondaryColor, '#008000', '#800080'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
      };

      const series = [
        {
          name: 'Users',
          data: userAcquisitionData.users,
        },
      ];

      return (
        <Suspense fallback={<div className={UserCSS.loading}>Loading...</div>}>
          <Chart options={options} series={series} type="bar" height={350} />
        </Suspense>
      );
    } else if (title === 'User Activity') {
      const options = {
        ...layoutSettings,
        chart: {
          ...layoutSettings.chart,
          id: 'user-activity-chart',
          type: 'heatmap',
        },
        xaxis: {
          ...layoutSettings.xaxis,
          categories: userActivityDates,
        },
        yaxis: {
          ...layoutSettings.yaxis,
          labels: {
            formatter: (value) => Math.round(value),
          },
        },
        colors: [primaryColor],
        dataLabels: {
          enabled: false,
        },
      };

      const series = userActivityData.map((dayData, index) => ({
        name: `Day ${index + 1}`,
        data: dayData.map((value) => ({
          x: userActivityDates[index],
          y: value,
        })),
      }));

      return (
        <Suspense fallback={<div className={UserCSS.loading}>Loading...</div>}>
          <Chart options={options} series={series} type="heatmap" height={350} />
        </Suspense>
      );
    }

    return null;
  };

  // Filtered cardData to remove 'User Retention' and 'User Demographics'
  const userCardData = [
    { id: 1, title: 'User Growth' },
    { id: 2, title: 'User Acquisition' },
    { id: 3, title: 'User Activity' },
  ];

  return (
    <div className={UserCSS.container}>
      <div className={UserCSS.cardGrid}>
        {userCardData.map((card) => (
          <div key={card.id} className={UserCSS.card}>
            {renderUserChart(card.title)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAnalytics;