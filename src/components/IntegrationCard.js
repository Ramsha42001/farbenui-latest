import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/IntegrationCard.module.css';
import { style } from "framer-motion/client";

const IntegrationCard = ({ name, description, icon, onIntegrate }) => {
    return (
        <div className={`card h-100 ${styles.integrationCard}`}>
            <div className="card-body d-flex flex-column align-items-center text-center">
                <div className={`${styles.integrationIcon} mb-3`}>{icon}</div> {/* Icon as JSX */}
                <h3 className={`card-title ${styles.integrationName}`}>{name}</h3>
                <p className={`card-text ${styles.integrationDescription}`}>{description}</p>
                <button onClick={onIntegrate} style={{backgroundColor:'#EB5A3C',border:'none',borderRadius:'10px',padding:'10px',color:'white',width:'150px'}}>
                    Integrate
                </button>
            </div>
        </div>
    );
};

export default IntegrationCard;
