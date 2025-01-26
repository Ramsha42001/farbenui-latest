// src/components/BotInfo.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/BotInfo.css';


const BotInfo = ({ bot }) => {
    if (!bot) {
        return <div>No bot data available. Please go back and select a bot.</div>;
    }
    return (
        <div className="bot-info-container">
            <h4 className='mb-3'>Bot Info</h4>
            {/* <p><strong>Data Set:</strong> {bot.dataSet}</p> */}
            <p><strong>Bot Name:</strong> {bot.bot_name}</p>
            <p><strong>Bot Status</strong> {bot.model_name}</p>
            <p><strong>Hyper Parameters:</strong> {JSON.stringify(bot.model_settings)}</p>
            <p><strong>Prompt:</strong> {bot.prompt}</p>

        </div>
    );
};

export default BotInfo;
