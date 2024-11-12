import { Language, TypeGbn, Word, WordBase } from '@/config/defaultType';
import { Box, Chip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import Chips from './Chips';
import Inputs from './Inputs';

interface Props {
  language: Language;
}

export default function EditorContainer({ language }: Props) {
  const [item, setItem] = useState<Word<WordBase>>();

  useEffect(() => {
    console.info(item);
  }, [item]);
  return (
    <Box sx={{ height: 500 }}>
      <SearchInput
        language={language as Language}
        routingStatus={false}
        onAddNewWord={(value) => {
          setItem(value);
        }}
      />

      <Chips item={item} />

      <Inputs />
    </Box>
  );
}
