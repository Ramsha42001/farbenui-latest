import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import '../styles/BotSetting.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { insertBot, updateBot } from '../features/bot/botSlice';
import { listDocuments } from '../features/document/documentSlice';
import axios from 'axios';
import styles from '../styles/BotSetting.module.css';

const BotSetting = () => {
  const [pdfUrls, setPdfUrls] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const bot = location.state?.bot;

  const user = useSelector((state) => state.auth.user);
  const documents = useSelector((state) => state.document.documents);
  const dispatch = useDispatch();

  const [botName, setBotName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.5); // Default temperature
  const [model, setModel] = useState(''); // Selected model
  const [loading, setLoading] = useState(false);
  const [embeddingsLoading, setEmbeddingsLoading] = useState(false);
  const [parsingLoading, setParsingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [parsingStatus, setParsingStatus] = useState(null); // Status of document parsing

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setUserEmail(localStorage.getItem('email'));
  }, []);

  const fetchDocuments = async () => {
    if (token) {
      try {
        const documentsResponse = await axios.get('https://farbenai-server-service-1087119049852.us-central1.run.app/documents', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPdfUrls(documentsResponse.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
        if (error.response) {
          console.error("Error Status:", error.response.status);
          console.error("Error Data:", error.response.data);

          if (error.response.status === 401) {
            navigate('/login');
          } else if (error.response.status === 403) {
            // Handle forbidden error
          }
        } else {
          console.error("Error Message:", error.message);
        }
      }
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [token, navigate]);

  useEffect(() => {
    if (userEmail) {
      dispatch(listDocuments(userEmail));
    }
  }, [userEmail, dispatch]);

 
  const handleParseDocument = async (e) => {
    e.preventDefault();

    setParsingLoading(true);
    try {
      const response = await fetch('https://farbenai-server-service-1087119049852.us-central1.run.app/parse', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          file_name: selectedDocument.filename,
          action: "parse"
         }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Parsing failed');
      }

    } catch (err) {
      console.error("Error parsing document:", err);
    } finally {
      setParsingLoading(false);
    }
  };

  const handleGenerateEmbeddings = async (e) => {
    e.preventDefault();

    setEmbeddingsLoading(true);
    try {
      const response = await fetch('https://farbenai-server-service-1087119049852.us-central1.run.app/parse', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          file_name: selectedDocument.filename,
          action: "embeddings"
         }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Parsing failed');
      }

    } catch (err) {
      console.error("Error parsing document:", err);
    } finally {
      setEmbeddingsLoading(false);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!botName || !prompt || !selectedDocument || !model) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const botSettings = {
      email: userEmail,
      bot_name: botName,
      prompt,
      file_name: selectedDocument.filename,
      temperature: parseFloat(temperature),
      model,
    };
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post(`https://farbenai-server-service-1087119049852.us-central1.run.app/create-bot/`, botSettings, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      console.log('Bot created successfully:', response.data);
      navigate('/bot-list');
  
    } catch (err) {
      console.error("Error creating bot:", err);
  
      if (err.response) {
        const errorData = err.response.data;
        setError(errorData.detail || 'Failed to create bot.');
        alert(errorData.detail || 'Failed to create bot.');
      } else if (err.request) {
        setError('No response received from server.');
        alert('No response received from server.');
      } else {
        setError(err.message || 'An error occurred.');
        alert(err.message || 'An error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className={styles.dashboardContainer}>
    
        <div className={styles.botSettingContainer}>
          <h3 className={styles.heading}>Customise Your Agent</h3>

          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.row}>
              {/* Prompt & Hyperparameters (First Column) */}
              <div className={styles.column}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <h5 className={styles.cardTitle}>Configuration</h5>
                    {/* Prompt Input */}
                    <div className={styles.formGroup}>
                      <label htmlFor="prompt" className={styles.formLabel}>
                        Prompt <span className={styles.required}>*</span>
                      </label>
                      <textarea
                        id="prompt"
                        className={styles.formControl}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your prompt here"
                        rows="5"
                        required
                      />
                    </div>

                    {/* Hyperparameters */}
                    <div className={styles.formGroup}>
                      <label htmlFor="temperature" className={styles.formLabel}>
                        Temperature (0-1) <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        id="temperature"
                        className={styles.formControl}
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        min="0"
                        max="1"
                        step="0.01"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="model" className={styles.formLabel}>
                        Model <span className={styles.required}>*</span>
                      </label>
                      <select
                        id="model"
                        className={styles.formControl}
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                      >
                        <option value="">Select a model</option>
                        <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                        <option value="gpt-4">gpt-4</option>
                        {/* Add more models here as needed */}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bot Name & Document Selection (Second Column) */}
              <div className={styles.column}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <h5 className={styles.cardTitle}>Bot Persona</h5>
                    {/* Bot Name Input */}
                    <div className={styles.formGroup}>
                      <label htmlFor="botName" className={styles.formLabel}>
                        Bot Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="botName"
                        className={styles.formControl}
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                        placeholder="Enter your Bot Name here"
                        required
                      />
                    </div>

                    {/* Document Selection */}
                    <div className={styles.formGroup}>
                      <label htmlFor="documentSelect" className={styles.formLabel}>
                        Select Document <span className={styles.required}>*</span>
                      </label>
                      <select
                        id="documentSelect"
                        className={styles.formControl}
                        value={selectedDocument ? selectedDocument.document_id : ''}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const doc = pdfUrls.find(d => d.document_id === selectedId);
                          setSelectedDocument(doc);
                        }}
                      >
                        <option value="">Select a document</option>
                        {pdfUrls.map((url) => (
                          <option key={url.document_id} value={url.document_id}>
                            {url.filename}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonContainer}>
                <div className={styles.buttonGroup}>
                    <button className={styles.buttonSecondary} onClick={handleParseDocument} disabled={parsingLoading}>
                    {parsingLoading ? 'Processing...' : 'Parse Document'}
                    </button>
                    <button className={styles.buttonSecondary} onClick={handleGenerateEmbeddings} disabled={embeddingsLoading}>
                    {embeddingsLoading ? 'Processing...' : 'Generate Embeddings'}
                    </button>
                </div>
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.buttonPrimary} disabled={loading}>
                    Create Agent
                    </button>
                </div>
            </div>
            {/* Parsing Status */}
            {parsingStatus && (
              <div className={styles.statusMessage}>
                <p>{parsingStatus}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BotSetting;