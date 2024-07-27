import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { SearchFormProps, Item } from '@/types/index';

const SearchForm = ({ onResults }: SearchFormProps) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      searchWord: '',
    },
  });

  const handleSubmit = async (values: { searchWord: string }) => {
    try {
      const res = await axios.get(
        `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=1063966721330772407&title=${values.searchWord}`,
      );
      const books = res.data.Items.map((element: Item, index: number) => ({
        id: index + 1,
        title: element.Item.title,
        author: element.Item.author,
        coverImageUrl: element.Item.mediumImageUrl,
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
