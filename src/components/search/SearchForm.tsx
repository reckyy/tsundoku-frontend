import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';

type Result = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
};

type SearchFormProps = {
  onResults: (results: Result[]) => void;
};

type Item = {
  affiliateUrl: string;
  author: string;
  authorKana: string;
  availability: string;
  booksGenreId: string;
  chirayomiUrl: string;
  contents: string;
  discountPrice: number;
  discountRate: number;
  isbn: string;
  itemCaption: string;
  itemPrice: number;
  itemUrl: string;
  largeImageUrl: string;
  limitedFlag: number;
  listPrice: number;
  mediumImageUrl: string;
  postageFlag: number;
  publisherName: string;
  reviewAverage: string;
  reviewCount: number;
  salesDate: string;
  seriesName: string;
  seriesNameKana: string;
  size: string;
  smallImageUrl: string;
  subTitle: string;
  subTitleKana: string;
  title: string;
  titleKana: string;
};

type ItemProps = {
  Item: Item;
};

const SearchForm = ({ onResults }: SearchFormProps) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      searchWord: '',
    },
  });

  const handleSubmit = async (value: { searchWord: string }) => {
    try {
      const res = await axios.get(
        `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=1063966721330772407&title=${value.searchWord}`,
      );
      const books = res.data.Items.map((element: ItemProps, index: number) => ({
        id: index + 1,
        title: element.Item.title,
        author: element.Item.author,
        imageUrl: element.Item.mediumImageUrl,
      }));
      onResults(books);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="検索"
        placeholder="本のタイトル"
        key={form.key('searchWord')}
        {...form.getInputProps('searchWord')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default SearchForm;
