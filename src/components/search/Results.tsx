import { Grid, GridCol, Center } from '@mantine/core';
import SearchResultCard from './SearchResultCard';
import { Book } from '@/types/index';
import { SessionProvider } from 'next-auth/react';

export default function Results({ bookItems }: { bookItems: Book[] }) {
  return (
    <SessionProvider>
      {bookItems.length > 1 ? (
        <Grid justify="center" align="stretch">
          {bookItems.map((book) => (
            <GridCol span={6} key={book.id}>
              <SearchResultCard book={book} />
            </GridCol>
          ))}
        </Grid>
      ) : (
        <Center>
          <SearchResultCard book={bookItems[0]} />
        </Center>
      )}
    </SessionProvider>
  );
}
