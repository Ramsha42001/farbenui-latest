import React from 'react';
import ReactApexChart from 'react-apexcharts';
import ConvoCss from '../../styles/convo.module.css';

const ConversationalAnalytics = () => {
  // Sample data - replace with your actual data
  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2024-01-01',
        '2024-01-02',
        '2024-01-03',
        '2024-01-04',
        '2024-01-05',
        '2024-01-06',
        '2024-01-07',
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy',
      },
    },
    colors: ['#EB5A3C', 'black'], // More visually appealing colors
  };

  const chartSeries = [
    {
      name: 'Total Conversations',
      data: [45, 52, 38, 65, 42, 55, 48],
    },
    {
      name: 'Successful Interactions',
      data: [35, 41, 30, 52, 38, 45, 42],
    },
  ];

  return (
    <div className={ConvoCss.conversationalAnalytics} style={{ width: '100%' }}>
      <div className={ConvoCss.sectionHeader}>
        <p>Track and analyze your chatbot's performance</p> {/* Added a subtitle */}
      </div>
      <div className={ConvoCss.contentWrapper}>
        <div className={ConvoCss.chartContainer}>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={350}
           width={500}
          />
        </div>

        <div className={ConvoCss.metricsGrid}>
          <div className={ConvoCss.metricCard}>
            <h3 className={ConvoCss.metricTitle}>Total Conversations</h3>
            <p className={ConvoCss.metricValue}>345</p>
          </div>
          <div className={ConvoCss.metricCard}>
            <h3 className={ConvoCss.metricTitle}>Avg. Response Time</h3>
            <p className={ConvoCss.metricValue}>2.5s</p>
          </div>
          <div className={ConvoCss.metricCard}>
            <h3 className={ConvoCss.metricTitle}>Success Rate</h3>
            <p className={ConvoCss.metricValue}>85%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationalAnalytics;