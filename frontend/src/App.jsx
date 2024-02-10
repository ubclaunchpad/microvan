import React, { useState } from "react";
import ListingSearchBar from "./components/ListingSearchBar";
import { SearchResultsList } from "./components/SearchResultsList";  // Adjust the import based on your export style

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <ListingSearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </div>
  );
}

export default App;
