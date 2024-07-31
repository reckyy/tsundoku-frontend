'use client';

import SearchForm from './SearchForm';
import Results from './Results';
import { useState } from 'react';
import { Book } from '@/types/index';
import { Grid, GridCol, Space, Container } from '@mantine/core';

const SearchHome = () => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleResults = (results: Book[]) => {
    setSearchResults(results);
  };

  return (
    <Container my="md">
      <Grid>
        <GridCol>
          <SearchForm onResults={handleResults} />
        </GridCol>
        <GridCol>
          <Space h={30} />
        </GridCol>
        <Results bookItems={searchResults} />
      </Grid>
    </Container>
  );
};

export default SearchHome;
