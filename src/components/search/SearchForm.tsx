import {
  TextInput,
  useMantineTheme,
  ActionIcon,
  rem,
  Grid,
  GridCol,
  Container,
  Menu,
  Button,
  MenuTarget,
  MenuItem,
  MenuLabel,
  MenuDropdown,
} from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { SearchFormProps, Item } from '@/types/index';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';

const SearchForm = ({ onResults }: SearchFormProps) => {
  const theme = useMantineTheme();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      searchWord: '',
    },
  });
  const data = [
    { label: 'title', target: 'タイトル' },
    { label: 'author', target: '著者' },
  ];
  const [selected, setSelected] = useState(data[0]);

  const items = data.map((item) => (
    <MenuItem onClick={() => setSelected(item)} key={item.label}>
      {item.target}
    </MenuItem>
  ));

  const handleSubmit = async (values: { searchWord: string }) => {
    const url = `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404`;
    const params =
      selected.label === 'title'
        ? { applicationId: '1063966721330772407', title: values.searchWord }
        : { applicationId: '1063966721330772407', author: values.searchWord };
    try {
      const res = await axios.get(url, { params });
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
    <Container my="md">
      <Grid>
        <GridCol offset={1} span={9}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              radius={'xl'}
              size="md"
              label="検索"
              placeholder="本のタイトルや著者"
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
        </GridCol>
        <GridCol span={2}>
          {' '}
          <Menu shadow="md" width={200}>
            <MenuTarget>
              <Button
                variant="default"
                rightSection={<IconChevronDown size={14} />}
              >
                {selected.target}
              </Button>
            </MenuTarget>

            <MenuDropdown>
              <MenuLabel>検索条件</MenuLabel>
              {items}
            </MenuDropdown>
          </Menu>
        </GridCol>
      </Grid>
    </Container>
  );
};

export default SearchForm;
