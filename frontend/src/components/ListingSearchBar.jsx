import React, { useState } from "react";
import searchicon from '../assets/searchicon.svg';
import "./ListingSearchBar.css";

function ListingSearchBar({ setResults }) {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("http://localhost:8000/vehicles?search=${value}")
      .then((response) => response.json())
      .then((json) =>
        setResults(
          json.vehicles
        )
      );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchData(input);
    }
  };

  const handleChange = (value) => {
    setInput(value);
  };

  return (
    <div className="input-wrapper">
      <img src={searchicon} className="search-icon" alt="search-icon" />
      <input
        placeholder="Search vehicle"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyPress}  
      />
    </div>
  );
}

export default ListingSearchBar;
