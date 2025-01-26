// src/components/BotList.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/BotList.css';
import Header from '../components/Header.js';
import Sidebar from '../components/Sidebar.js';
import { listBots, deleteBot,deployBot } from '../features/bot/botSlice';
import axios from 'axios';
const BotList = () => {
    const token = localStorage.getItem('token');
    const [botData, setBotData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [isloading,setisLoading]=useState(false);
    
    useEffect(() => {
        console.log('user: ', user);
        if (user?.username) {
            console.log('Dispatching listBots with:', user.username);
            dispatch(listBots(user.username));
        }
        
    }, [user, dispatch, location]);
    
    const { bots, loading, error } = useSelector((state) => state.bot);
    console.log("bots:", bots)

    // const fetchDocuments = async () => {
    //     if (token) { // Only fetch if token is available
    //         setisLoading(true);
    //       try {
    //         const documentsResponse = await axios.get('http://localhost:8080/create-bot', {
    //           headers: {
    //             Authorization: `Bearer ${token}`
    //           }
    //         });
    //         setBotData(documentsResponse.data);
    //       } catch (error) {
    //         console.error('Error fetching documents:', error);
    //         if (error.response) {
    //           console.error("Error Status:", error.response.status);
    //           console.error("Error Data:", error.response.data);
    
    //           if (error.response.status === 401) {
    //             navigate('/login');
    //           } else if (error.response.status === 403) {
    //             // Handle forbidden error
    //           }
    //         } else {
    //           console.error("Error Message:", error.message);
    //         }
    //       }finally{
    //         setisLoading(false);
    //     }
    //     }
    //   };
    
    //   useEffect(() => {
    //     fetchDocuments();
    //   }, [token, navigate]);
    

console.log("botData:",botData)
    const [activeBotId, setActiveBotId] = useState(null);
    const menuRefs = useRef([]);
    const menuIconRefs = useRef([]);

    // Close menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check each menu and menu icon to see if the click was outside
            let clickedOutside = true;
            menuRefs.current.forEach((menuRef, index) => {
                if (
                    menuRef?.contains(event.target) ||
                    menuIconRefs.current[index]?.contains(event.target)
                ) {
                    clickedOutside = false;
                }
            });

            if (clickedOutside) {
                setActiveBotId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Sample bot data ( replace this with API call data)
    // const bots = [
    //     { id: 1, name: 'Bot 1', dataSet: 'Data Set 1', modelName: 'Model 1', hyperParameters: 'param1=10, param2=20' },
    //     { id: 2, name: 'Bot 2', dataSet: 'Data Set 2', modelName: 'Model 2', hyperParameters: 'param1=15, param2=25' },
    // ];

    const handleMenuClick = (action, bot) => {
        if (action === 'delete') {
            if (window.confirm('Are you sure you want to delete this Agent?')) {
                dispatch(deleteBot(bot.bot_id));
            }
            setActiveBotId(null);
        } else if (action === 'edit') {
            navigate(`/bot-setting/${bot.bot_id}`, { state: { bot } });
            setActiveBotId(null);
        }

        else if(action==='deploy'){
            console.log(user.username,bot.document_name)
            dispatch(deployBot(bot.document_name,user.username)).then(()=>{
                dispatch(listBots(user.username));
            });
        }
    };

    const toggleMenu = (botId) => {
        setActiveBotId((prevActiveBotId) => (prevActiveBotId === botId ? null : botId));
    };

    const truncateText = (text, maxLength = 20) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const handleCreateNewBot = () => {
        navigate('/bot-setting'); 
    };



    if (loading) return <div>Loading Agents...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div>
            <Header />
            <div>
                <Sidebar />
            </div>
            <section>
                <div className="bot-list-container ">
                    <div className="bot-list-header">
                        <h3>Agents List</h3>
                        <button className="create-bot-btn btn btn-primary" style={{backgroundColor:"#EB5A3C",borderColor:"#333"}} onClick={handleCreateNewBot}>&nbsp;+&nbsp; Create New Agent</button>
                    </div>
                    <div className="bot-list-wrapper my-3">
                        {
                            isloading?<div>Loading...</div>:
                        
                        <table className="bot-table table table-hover table-responsive">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Document</th>
                                    <th scope="col">Prompt</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(botData) && botData.length ? (
                                    botData.map((bot, index) => (
                                        <tr key={bot.bot_id}>
                                            <th scope='row'>{index + 1}</th>
                                            <td>{bot.name}</td>
                                            <td>deployed</td>
                                            <td>{bot.file_name}</td>
                                            <td>{truncateText(bot.prompt)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No Agents found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                        {/* Bot Info (Displayed when a bot is selected) */}
                        {/* {selectedBot && <BotInfo bot={selectedBot} />} */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BotList;
