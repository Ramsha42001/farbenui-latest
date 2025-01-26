import React, { useState } from "react";
import axios from "axios";
import "../styles/Sentiment.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const SentimentAnalysisPage = () => {
  const [inputText, setInputText] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [keyInsights, setKeyInsights] = useState(null);
  const [overallScore, setOverallScore] = useState(null);
  const [showResults, setShowResults] = useState(false);


  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleClear = () => {
    setInputText("");
    setShowResults(false);
  };

  const handleSubmit = async () => {
    if (inputText.trim() === "") {
      alert("Please enter text for analysis");
      return;
    }

    // Create a JSON object with the input text
    const requestPayload = {
      user_text: inputText, // Structure the text as part of a JSON object
    };

    try {
      const response = await axios.post(
        "https://sentiment-analysis-service-166527752013.us-central1.run.app/sentiment-analysis",
        requestPayload, // Send the JSON object as payload
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*", // Set the correct content type
          },
        }
      );

      const data = response.data; // Extract response data
      console.log(data);
      console.log(data[0].Feedback)

      // Set the results based on the response data
      setFeedback(data[0].Feedback); // Set the sentiment (e.g., positive or negative)
      setKeyInsights(data[0]["Key Insights"]); // Set key insights
      setOverallScore(data[0]["Overall Score"]); // Set overall score
      setShowResults(true); // Show the results container
    } catch (error) {
      console.error("Error fetching sentiment analysis:", error);
      alert("There was an error processing your request.");
    }
  };

  const [rating, setRating] = useState(0); // State to store the current rating
  const [hover, setHover] = useState(0);   // State to store the hovered star rating

  const keywords = [
    { id: 1, name: "BJP" },
    { id: 2, name: "RSS" },
    { id: 3, name: "politics" },
  ];

  return (
    <>
    <div>
    <Header />
  </div>
  <div>
    <Sidebar />
  </div>
  <div className="sentiment-analysis-page">
    <div className="row col-12">
      <div className="">
        <h3>Sentiment Analysis</h3>

        <textarea
          placeholder="Enter text for sentiment analysis..."
          value={inputText}
          onChange={handleInputChange}
          className="text-box"
        />
        <div className="button-container">
          <button
            onClick={handleSubmit}
            className="submit-button btn btn-primary"
          >
            Analyze Sentiment
          </button>
          <button
            onClick={handleClear}
            className="submit-button btn btn-primary"
          >
            Clear Sentiment
          </button>
        </div>

        {showResults && (
          <div className="output-container my-4">
            <h3>Analysis Result</h3>
            <div className="output-results">
              <div className="row col-12">
                {/* Score Card */}
                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">Overall Score</h5>
                      <span className="fs-5">
                        {overallScore !== null ? overallScore : "N/A"}
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: `${overallScore}%` }}
                          aria-valuenow={overallScore}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sentiment Category Card */}
                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">Sentiment</h5>
                      <span className="fs-5">
                        {feedback === "positive" ? (
                          <i className="fa-solid fa-thumbs-up fa-2xl text-success"></i>
                        ) : (
                          <i className="fa-solid fa-thumbs-down text-danger" />
                        )}
                      </span>
                    </div>
                    <div className="card-body text-start">
                      <small>{feedback || "N/A"}</small>
                    </div>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="my-3">
                  <h4>Key Insights</h4>
                  <hr className="my-2" />
                  <div className="content">
                    {keyInsights ? keyInsights : "No insights available"}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</>
  );
};

export default SentimentAnalysisPage;
