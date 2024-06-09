'use client';

import SearchForm from './SearchForm';
import Results from './Results';
import { useState } from 'react';

type Result = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
};

const SearchHome = () => {
  const [searchResults, setSearchResults] = useState<Result[]>([]);

  const handleResults = (results: Result[]) => {
    setSearchResults(results);
  };

  return (
    <div>
      <SearchForm onResults={handleResults} />
      <Results results={searchResults} />
    </div>
  );
};

export default SearchHome;
