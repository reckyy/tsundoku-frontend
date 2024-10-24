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
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { searchBooks } from '@/utils/searchBooks';
import { Book } from '@/types/index';

type SearchFormProps = {
  onResults: (results: Book[]) => void;
};

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

  const handleSubmit = (values: { searchWord: string }) => {
    searchBooks({ searchWord: values.searchWord, selected, onResults });
  };

  return (
    <Container my="md">
      <Grid>
        <GridCol offset={1} span={9}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              radius={'xl'}
              size="md"
              aria-label="search"
              placeholder="本のタイトルや著者"
              rightSectionWidth={42}
              styles={{
                input: {
                  color: '#37352f',
                },
              }}
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
                  aria-label="searchIcon"
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
