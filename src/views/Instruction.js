import React from 'react';
import styles from '../styles/Instruction.module.css'; // Custom styles for the instruction page

import Header from '../components/Header.js';
import Sidebar from '../components/Sidebar.js';

const Instruction = () => {
    return (
        <div>
            <Header />
            <div className="">
                <Sidebar />
                <section className={`container my-4`}>
                    <div className={styles.instructionContainer}>
                        <h1 className={`${styles.pageTitle} text-center mb-4`}>How-To Guides</h1>

                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h3 className={`card-title ${styles.cardTitle}`}>Uploading Data</h3>
                                        <p>Follow the steps below to upload your data:</p>
                                        <ol>
                                            <li>Go to the "Upload" section in the navigation bar.</li>
                                            <li>Click on the "Browse" button to select your data file from your device.</li>
                                            <li>Click "Upload" to submit your file to the system.</li>
                                            <li>Your data will be processed, and you will receive a confirmation message once the upload is complete.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h3 className={`card-title ${styles.cardTitle}`}>Creating an Agent</h3>
                                        <p>To create a new agent, follow these instructions:</p>
                                        <ol>
                                            <li>Go to the "Agents" section in the sidebar.</li>
                                            <li>Click the "Create New Agent" button.</li>
                                            <li>Fill in the required details, such as the agent's name and model.</li>
                                            <li>Click "Save" to create your agent. It will appear in the agent list.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h3 className={`card-title ${styles.cardTitle}`}>Adding a Connection</h3>
                                        <p>To add a new connection, follow these steps:</p>
                                        <ol>
                                            <li>Navigate to the "Connections" section in the sidebar.</li>
                                            <li>Click on the "Add Connection" button.</li>
                                            <li>Choose the type of connection and fill in the necessary details.</li>
                                            <li>Click "Save" to establish the connection.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h3 className={`card-title ${styles.cardTitle}`}>Managing Settings</h3>
                                        <p>To manage your settings:</p>
                                        <ol>
                                            <li>Go to the "Settings" page from the main menu.</li>
                                            <li>Make any adjustments to your preferences or configurations.</li>
                                            <li>Click "Save Changes" to apply your new settings.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Instruction;
