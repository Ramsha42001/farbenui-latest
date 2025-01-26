import React from 'react';
import styles from '../../styles/Overview.module.css';
import Header from '../Header';
import Sidebar from '../Sidebar';

const WebsiteOverview = () => {
  return (
    <>
    <Header />
    <Sidebar />
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Revolutionize Your Workflow with AI Assistants</h1>
          <p className={styles.subtitle}>
            Our platform empowers you to create, manage, and deploy AI assistants
            that streamline your business operations and enhance customer interactions.
          </p>
          <button className={styles.callToAction}>Get Started Now</button>
        </div>
        <div className={styles.heroImage}>
          {/* Placeholder for a visual representation of the platform */}
          <img src="/placeholder-hero.png" alt="AI Assistant Platform" />
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Key Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <img src="/feature-icon-1.svg" alt="Feature Icon" className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Intuitive Dashboard</h3>
            <p className={styles.featureDescription}>
              Monitor and manage your AI assistants with ease through our user-friendly dashboard.
            </p>
          </div>
          <div className={styles.feature}>
            <img src="/feature-icon-2.svg" alt="Feature Icon" className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Powerful Analytics</h3>
            <p className={styles.featureDescription}>
              Gain insights into user interactions, conversation patterns, and assistant performance with our in-depth analytics.
            </p>
          </div>
          <div className={styles.feature}>
            <img src="/feature-icon-3.svg" alt="Feature Icon" className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Seamless Agent Creation</h3>
            <p className={styles.featureDescription}>
              Build and customize AI assistants tailored to your specific needs without complex coding.
            </p>
          </div>
          <div className={styles.feature}>
            <img src="/feature-icon-4.svg" alt="Feature Icon" className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Document Management</h3>
            <p className={styles.featureDescription}>
              Easily upload and manage documents to train and enhance your AI assistants' knowledge base.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Our Users Say</h2>
        <div className={styles.testimonialCarousel}>
          {/* Add a carousel component here if you have multiple testimonials */}
          <div className={styles.testimonial}>
            <p className={styles.testimonialQuote}>
              "This platform has transformed the way we handle customer support.
              The AI assistants are incredibly efficient and have saved us countless hours."
            </p>
            <p className={styles.testimonialAuthor}>- Jane Doe, Head of Customer Support</p>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.sectionTitle}>Ready to Transform Your Business?</h2>
        <button className={styles.callToAction}>Start Your Free Trial</button>
      </section>
    </div>
    </>

  );
};

export default WebsiteOverview;