//import React, { useState } from "react";
import "./App.css";
import Navbar from "./Nav"; // Assuming your component is in 'Nav.js'

import React, { useRef, useState, useEffect } from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home({ isLoggedIn, setIsLoggedIn }) {
  const [query, setQuery] = useState("");          // Search query
  const [results, setResults] = useState([]);      // Results from backend
  const [loading, setLoading] = useState(false);   // Loading state
  const [error, setError] = useState("");          // Error state
  const [hasSearched, setHasSearched] = useState(false);

useEffect(() => {
  if (query.trim() === "") {
    setResults([]);
    setHasSearched(false);
  }
}, [query]);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);
    setHasSearched(false)

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/search?q=${query}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setResults(data);  // Assuming `data` is a list of objects
      setHasSearched(true)
    } catch (err) {
      setError("Failed to fetch results.");
    } finally {
      setLoading(false);
    }

  };




  let content;
  if (!hasSearched ){
  content = (
  <div className="image-container">
    <img src="/photos/search-img.png" alt="Search Illustration" className="sub-body-image" />
  </div>
  );
  }
  else if (!hasSearched || query.trim() === "") {
  content = (
    <div className="image-container">
      <img src="/photos/search-img.png" alt="Search Illustration" className="sub-body-image" />
    </div>
  );
}
else if(hasSearched && results.length===0){
content = (
<div className="image-container">
    <p className="no-results-message"style={{color: "white"}}>No results found. Please try a different keyword.</p>
    <img src="/photos/not-found.png" alt="Search Illustration" className="sub-body-image" />
</div>
);
}

  else if (loading){
  content = <p> Loading...</p>
  }
  else if (error) {
  content = <p>{error}</p>;
  }
  else{
content = (
  <div
        className="results-container">
        <div className="results">
  {results.map((result, index) => (
    <div key={index} className="card">
      <div className="image-container-card">
        <img
          src="/photos/code.png"
          alt="Search Illustration"
          className="main-image"
        />
      </div>
      <h3>{result.names}</h3>
      <a
        href={result["Question Link"]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {result["Question Link"]}
      </a>
    </div>
  ))}
</div>

    </div>
);

  }

  return (
  <>
  <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
  <div className="search-bar">
        <input
          type="text"
          placeholder="Search your favorite question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {content}
      </div>

    </>
  );
}

export default Home;
