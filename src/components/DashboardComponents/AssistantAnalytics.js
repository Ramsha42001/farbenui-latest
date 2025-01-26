import React, { lazy, Suspense } from 'react';
import { cardData, dates, usersLatest, usersPrevious, sessionsLatest, sessionsPrevious, topIntents, intentCounts, tokensPerDay, averageTokens, interactions, previousInteractions, primaryColor } from '../../app/Data/DashboardData';
import AssistantCSS from '../../styles/Assistant.module.css';

const Chart = lazy(() => import('react-apexcharts'));

const AssistantAnalytics = () => {
  const filteredCardData = cardData.filter(
    (card) =>
      ![
        'Total Interactions',
        'Unique users',
        'Unique sessions',
        'Recognition Rate',
        'Fallback Rate',
      ].includes(card.title)
  );
  const renderChart = (title) => {
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

    if (title === 'Users') {
      const options = {
        ...layoutSettings,
        chart: {
          ...layoutSettings.chart,
          id: 'users-chart',
          type: 'line',
        },
        xaxis: {
          ...layoutSettings.xaxis,
          categories: dates,
        },
        yaxis: {
          ...layoutSettings.yaxis,
          min: 0,
          max: Math.max(...usersLatest) + Math.max(...usersPrevious),
        },
        colors: ['#EB5A3C', 'black'],
        stroke: {
          width: 3,
        },
      };

      const series = [
        {
          name: 'Latest',
          data: usersLatest,
        },
        {
          name: 'Previous',
          data: usersPrevious,
        },
      ];

      return (
        <Suspense fallback={<div className={AssistantCSS.loading}>Loading...</div>}>
          <Chart options={options} series={series} type="line" height={350} />
        </Suspense>
      );
    } else if (title === 'Sessions') {
      const options = {
        ...layoutSettings,
        chart: {
          ...layoutSettings.chart,
          id: 'sessions-chart',
          type: 'line',
        },
        xaxis: {
          ...layoutSettings.xaxis,
          categories: dates,
        },
        yaxis: {
          ...layoutSettings.yaxis,
          min: 0,
          max: Math.max(...sessionsLatest) + Math.max(...sessionsPrevious),
        },
        colors: ['#EB5A3C', 'black'],
        stroke: {
          width: 3,
        },
      };

      const series = [
        {
          name: 'Latest',
          data: sessionsLatest,
        },
        {
          name: 'Previous',
          data: sessionsPrevious,
        },
      ];

      return (
        <Suspense fallback={<div className={AssistantCSS.loading}>Loading...</div>}>
          <Chart options={options} series={series} type="line" height={350} />
        </Suspense>
      );
    } else if (title === 'Top Intents') {
      const options = {
        ...layoutSettings,
        chart: {
          ...layoutSettings.chart,
          id: 'top-intents-chart',
          type: 'bar',
        },
        xaxis: {
          ...layoutSettings.xaxis,
          categories: topIntents,
        },
        yaxis: {
          ...layoutSettings.yaxis,
          min: 0,
          max: Math.max(...intentCounts),
        },
        colors: [primaryColor],
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
      };

      const series = [
        {
          name: 'Intent Count',
          data: intentCounts,
        },
      ];

      return (
        <Suspense fallback={<div className={AssistantCSS.loading}>Loading...</div>}>
          <Chart options={options} series={series} type="bar" height={350} />
        </Suspense>
      );
    } else if (title === 'Tokens Plot') {
      const options = {
        ...layoutSettings,
        chart: {
          ...layoutSettings.chart,
          id: 'tokens-chart',
          type: 'area',
        },
        xaxis: {
          ...layoutSettings.xaxis,
          categories: dates,
        },
        yaxis: {
          ...layoutSettings.yaxis,
          min: 0,
          max: Math.max(...tokensPerDay),
        },
        colors: [primaryColor],
        stroke: {
          width: 3,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
          },
        },
        dataLabels: {
          enabled: false,
        },
      };

      const series = [
        {
          name: 'Tokens',
          data: tokensPerDay,
        },
      ];

      return (
        <Suspense fallback={<div className={AssistantCSS.loading}>Loading...</div>}>
          <Chart options={options} series={series} type="area" height={350} />
        </Suspense>
      );
    } else if (title === 'Interactions Line') {
      const options = {
        ...layoutSettings,
        chart: {
          ...layoutSettings.chart,
          id: 'interactions-chart',
          type: 'line',
        },
        xaxis: {
          ...layoutSettings.xaxis,
          categories: dates.slice(0, interactions.length),
        },
        yaxis: {
          ...layoutSettings.yaxis,
          min: 0,
          max: Math.max(...interactions) + Math.max(...previousInteractions),
        },
        colors: ['#EB5A3C', 'black'],
        stroke: {
          width: 3,
        },
      };

      const series = [
        {
          name: 'Latest',
          data: interactions,
        },
        {
          name: 'Previous',
          data: previousInteractions,
        },
      ];

      return (
        <Suspense fallback={<div className={AssistantCSS.loading}>Loading...</div>}>
          <Chart options={options} series={series} type="line" height={350} />
        </Suspense>
      );
    }

    return null;
  };

  return (
    <div className={AssistantCSS.container}>
              <div className={AssistantCSS.cardGrid}>
        {filteredCardData.map((card) => (
          <div key={card.id} className={AssistantCSS.card}>
            {renderChart(card.title)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssistantAnalytics;