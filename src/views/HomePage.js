import React from 'react';
// import img from '../styles/images/FirstImage.webp';
import Header from "../components/Header.js";
import ScrollerBanner from '../components/Scrollbanner.js';
import Image_home from '../styles/images/chat.png'
import HomeCss from '../styles/Home.module.css'
import Widget from '../components/Widget/Widget.js'
function HomePage() {
  const headerHeight = '80px';

  return (
    <>
      <div className={HomeCss.header}>
        <Header />
      </div>
      <div className={`${HomeCss['main-container']} container-fluid`}>

        <div className={HomeCss['left-section']}>
          <h1 className={HomeCss.heading1}>Unlock smarter support with <span className={HomeCss.genai}>Generative AI</span></h1>


          <p className={HomeCss.heading2}>
            Farben.ai harnesses the power of cutting-edge Generative AI agents to revolutionize your customer experience.  Our intelligent agents seamlessly integrate with your systems, enabling them to instantly retrieve detailed order histories and securely update user data.  This means faster, more efficient support interactions, empowering customers with self-service options and freeing your team to focus on complex issues. Experience the future of customer service with Farben.ai's smart, adaptable AI agents.
          </p>

          {/* <div className="button-container d-flex justify-content-center justify-content-md-start mb-4">
              <div className="button">Button</div>
            </div> */}
        </div>
        <div className={HomeCss['right-section']}>
          <img className={`${HomeCss.image} img-fluid`} src={Image_home} alt='home-page-image' />
        </div>
      </div>
      <div style={{position: 'fixed', bottom: '40px', right: '40px', zIndex: 1000000000}}>
      <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
<df-messenger
  intent="WELCOME"
  chat-title="farben.ai"
  agent-id="58159ade-2d54-4d56-81f3-18b7d9990102"
  language-code="en"
></df-messenger></div>
      <div
        className={HomeCss['iframe-responsive']}
      // style={{
      //     position: 'fixed',
      //     bottom: '20px',
      //     right: '20px',
      //     zIndex: 9999,
      //     width: '600px',
      //     height: '700px',
      // }}
      >
      </div>

      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999}}>
        <Widget />
      </div>
    </>
  );
}

export default HomePage;