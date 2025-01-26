import React from 'react';
import "../styles/Home.css";
import img from '../styles/images/FirstImage.webp';
import Header from "../components/Header.js";
import ScrollerBanner from '../components/Scrollbanner.js';
import ChatWidget from '../components/Widget/Widget.js';
import Image_home from '../styles/images/img-4.jpg'

function HomePage() {
  const headerHeight = '80px'; 

  return (
    <>
      <div className='header'>
        <Header />
      </div>
      <div className="main-container container-fluid" style={{ paddingTop: headerHeight }}>
        <div className="landing row">
        
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <div className="vertical-div mb-4">
              <h1 className='heading1'>Unlock smarter support with <span className='genai'>Generative AI</span></h1>
            </div>
            <div className="vertical-div mb-4">
              <p className='heading2'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
            {/* <div className="button-container d-flex justify-content-center justify-content-md-start mb-4">
              <div className="button">Button</div>
            </div> */}
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <img className='image img-fluid' style={{height: 500}} src={Image_home} alt='home-page-image' />
          </div>
        </div>

      </div>
    {/* Chat Widget positioned at the bottom right */}
    <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000, // Ensure it's on top of other elements
      }}>
        <ChatWidget />
      </div>

      {/* <div className="iframe-responsive">
        <iframe
          src="https://chatbot-new-2327227512.us-central1.run.app/"
          style={{ border: 'none', overflow: 'hidden', width: '100%', height: '100%' }}
          title="Embedded Widget"
        ></iframe>
      </div> */}

<div >

</div>
    </>
  );
}

export default HomePage;
