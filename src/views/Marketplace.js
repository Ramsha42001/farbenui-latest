import React, { useState } from "react";
import IntegrationCard from "../components/IntegrationCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Marketplace.module.css';

import Header from '../components/Header.js';
import Sidebar from '../components/Sidebar.js';
import { TbBrandSlack , TbBrandGoogleDrive , TbBrandZoom  } from "react-icons/tb"; // Importing specific icons

const Marketplace = () => {

    const integrationsData = [
        { id: 1, name: 'Slack', description: 'Integrate Slack for team communications.', icon: <TbBrandSlack color="#EB5A3C" /> },
        { id: 2, name: 'Google Drive', description: 'Access files from Google Drive', icon: <TbBrandGoogleDrive color="#EB5A3C" /> },
        { id: 3, name: 'Zoom', description: 'Schedule and join Zoom meetings', icon: <TbBrandZoom color="#EB5A3C" /> },
        
    ];

    const [searchQuery, setSearchQuery] = useState('');

    const handleIntegrate = (integrationName) => {
        alert(`Integrating with ${integrationName}`);
    };

    const filteredIntegrations = integrationsData.filter(integration =>
        integration.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Header />
            <div>
                <Sidebar />
                <section className="container my-4">
                    <div className={styles.marketplaceContainer}>
                        <h1 className={`text-center mb-4 ${styles.marketplaceTitle}`}>Integration Marketplace</h1>
                        
                        <div className="input-group mb-4">
                            <input
                                type="text"
                                placeholder="Search Integrations..."
                                className={`form-control ${styles.searchBar}`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className={`row ${styles.integrationsList}`}>
                            {filteredIntegrations.map(integration => (
                                <div key={integration.id} className="col-md-4 mb-4">
                                    <IntegrationCard
                                        name={integration.name}
                                        description={integration.description}
                                        icon={integration.icon}
                                        onIntegrate={() => handleIntegrate(integration.name)}
                                        color="#EB5A3C"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Marketplace;
