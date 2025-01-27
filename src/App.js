import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './views/Login';
import HomePage from './views/HomePage';
import Dashboard from './views/Dashboard';
import DataPage from './views/DataPage';
import BotSetting from './views/BotSetting';
import BotList from './views/BotList';
import SentimentAnalysisPage from './views/sentiment';
import Marketplace from './views/Marketplace';
import Instruction from './views/Instruction';
import './App.css';
import Signup from './views/Signup';
import AssistantAnalytics from './components/DashboardComponents/AssistantAnalytics';
import ConverationalAnalytics from './components/DashboardComponents/converationalAnalytics';
import PerformanceAnalytics from './components/DashboardComponents/performanceAnalytics';
import UserAnalytics from './components/DashboardComponents/userAnalytics';
import WebsiteOverview from './components/DashboardComponents/Overview';
import Document from './views/document'
import Invoice from './views/Invoice'
import Approve from './views/Approve'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        {/* Add other routes here */}
        {/* <Route path='/overview' element={<WebsiteOverview />} /> */}
        <Route path='/dashboard' element={<Dashboard />}>
        
          <Route path='assistant' element={<AssistantAnalytics />} />
          <Route path='conversation' element={<ConverationalAnalytics />} />
          <Route path='user' element={<UserAnalytics />} />
          <Route path='performance' element={<PerformanceAnalytics />} />
        </Route>
        <Route path='/data' element={<DataPage />}>
          <Route index element={<Navigate to="/data/documents" replace />} />
          <Route path='documents' element={<Document />} />
          <Route path='invoice' element={<Invoice />} />
          <Route path='approve' element={<Approve />} />
        </Route>

        <Route path="/bot-setting" element={<BotSetting />} />

        <Route path="/bot-setting/:id" element={<BotSetting />} />
        <Route path="/bot-list" element={<BotList />} />
        {/* <Route path='/sentiment-analysis' element={<SentimentAnalysisPage />}/> */}

        <Route path='/marketplace' element={<Marketplace />} />
        <Route path='/instruction' element={<Instruction />} />

      </Routes>
    </Router>
  );
}



export default App;
