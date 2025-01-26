import React, { useState, useEffect, useRef } from 'react';
import './Widget.css';
import farbenLogo from '../../styles/images/farbenbg.png';
const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isClosed, setIsClosed] = useState(true); // State for closed/open widget
  const [email, setEmail] = useState(''); 
  const [fileName, setFileName] = useState('');
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);

  // Function to completely close the widget
  const closeWidget = () => {
    setIsClosed(true); // Set isClosed to true
    setShowChat(false);
    setMessages([]);
    setEmail('');
    setFileName('');
    setInput('');
  };

  // Function to open the widget
  const openWidget = () => {
    setIsClosed(false); // Set isClosed to false
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      const bot_name = 'bot1';
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/query/test-bot1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bot_name: bot_name,
          query: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.answer) {
        const aiMessage = {
          role: 'ai',
          content: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'ai',
        content: `Sorry, I encountered an error: ${error.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Show the widget in a closed state if 'isClosed' is true
  if (isClosed) {
    return (
      <div className="chat-widget closed" onClick={openWidget}>
        <div className="chat-header">
          <h3 className="chat-header-title">Jarvis</h3>
        </div>
      </div>
    );
  }

  // Render the full chat widget when 'isClosed' is false
  return (
    <div className={`chat-widget open`}>
      <div className="chat-header" >
        <img width={50} height={50} src={farbenLogo} alt="logo" className="logo" />
        <span className="farben-subheading">24x7 Customer Support Bot</span>
        {/* Close button only visible when chat is open */}
        <div className="close" onClick={closeWidget}>&times;</div>
      </div>

      <div className="chat-body">
        <div className="messages" ref={messagesEndRef}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`} style={{ overflowWrap: 'break-word' }}>
              {message.content}
              <span className="timestamp">{message.timestamp}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask anything..."
            value={input}
            onChange={handleInputChange}
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;