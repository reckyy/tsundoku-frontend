import { TextInput, useMantineTheme, ActionIcon, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { SearchFormProps, Item } from '@/types/index';

const SearchForm = ({ onResults }: SearchFormProps) => {
  const theme = useMantineTheme();
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
        coverImageUrl: element.Item.largeImageUrl,
      }));
      onResults(books);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        radius={'xl'}
        size="md"
        placeholder="本のタイトル"
        rightSectionWidth={42}
        leftSection={
          <IconSearch
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
            onClick={() => form.onSubmit(handleSubmit)()}
          >
            <IconArrowRight
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        }
        key={form.key('searchWord')}
        {...form.getInputProps('searchWord')}
      />
    </form>
  );
};

export default SearchForm;
