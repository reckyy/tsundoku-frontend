'use client';

import SearchForm from './SearchForm';
import Results from './Results';
import { useState } from 'react';
import { Book } from '@/types/index';

const SearchHome = () => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleResults = (results: Book[]) => {
    setSearchResults(results);
  };

  return (
    <div>
      <SearchForm onResults={handleResults} />
      <Results bookItems={searchResults} />
    </div>
  );
};

export default SearchHome;
