import { Image } from '@mantine/core';

type Result = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
};

type ResultProps = {
  results: Result[];
};

const Results = ({ results }: ResultProps) => {
  return (
    <div>
      {results.length > 0 ? (
        results.map((result) => (
          <div key={result.id}>
            <h3>{result.title}</h3>
            <h3>{result.author}</h3>
            <Image radius="md" w={100} h={100} src={result.imageUrl} alt={result.title} />
          </div>
        ))
      ) : (
        <p>検索結果がありません。</p>
      )}
    </div>
  );
};

export default Results;
