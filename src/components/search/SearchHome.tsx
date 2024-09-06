'use client';

import SearchForm from './SearchForm';
import Results from './Results';
import { useState } from 'react';
import { Book } from '@/types/index';
import { Grid, GridCol, Space, Container, Text } from '@mantine/core';

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
      </Grid>
      {searchResults.length > 0 ? (
        <Results bookItems={searchResults} />
      ) : (
        <Text ta="center">検索結果がありません。</Text>
      )}
    </Container>
  );
};

export default SearchHome;
