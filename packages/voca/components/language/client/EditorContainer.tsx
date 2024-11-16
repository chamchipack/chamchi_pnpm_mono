import {
  Example,
  Language,
  TypeGbn,
  Word,
  WordBase,
} from '@/config/defaultType';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import Chips from './Chips';
import LabelAndInputs from './Inputs';
import ExampleInputs from './ExampleInput';
import AddIcon from '@mui/icons-material/Add';
import { kboFont } from 'package/styles/fonts/module';
import AlertModal from 'package/src/Modal/SaveModal';

interface Props {
  language: Language;
}

export default function EditorContainer({ language }: Props) {
  const [item, setItem] = useState<Word<WordBase>>();
  const [example, setExample] = useState<Example[]>(item?.example || []);
  const [modal, setModal] = useState(false);

  const onClose = () => setModal(false);

  const onClickSaveWord = async () => {};

  const onChangeItem = (key: string, data: any) => {
    setItem((prev: any) => ({
      ...prev,
      [key]: data,
    }));
  };

  const onClickAddExample = () => {
    setExample((prev) => [
      ...prev,
      { ko: '', jp: '' }, // 새로운 빈 항목 추가
    ]);
  };

  const onChangeExample = (key: string, index: number, value: string) => {
    setExample((prev) => {
      const updatedExamples = [...prev]; // 기존 배열 복사
      updatedExamples[index] = {
        ...updatedExamples[index], // 기존 객체 복사
        [key]: value, // ko 또는 jp 키의 값을 업데이트
      };
      return updatedExamples;
    });
  };

  useEffect(() => {
    console.info(item);
    if (item?.example) setExample(item?.example);
  }, [item]);
  return (
    <Box sx={{ height: 500, overflowY: 'auto', p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
        <Chip
          sx={{
            background: (theme) => theme.palette.info.light,
            color: 'text.secondary',
          }}
          onClick={() => setModal(true)}
          label={'저장'}
        ></Chip>
        <Chip
          sx={{ background: (theme) => theme.palette.warning.main, mx: 1 }}
          onClick={() => {
            setItem({} as Word<WordBase>);
            setExample([]);
          }}
          label={'초기화'}
        ></Chip>
      </Box>

      <SearchInput
        language={language as Language}
        routingStatus={false}
        onAddNewWord={(value) => {
          setItem(value);
        }}
      />

      <Divider sx={{ my: 2 }} />

      <Chips item={item} onChangeItem={onChangeItem} />

      <LabelAndInputs
        value={item?.jp}
        label="단어 원문"
        onChangeItem={onChangeItem}
        dataKey="jp"
        languageType={'jp'}
      />

      <LabelAndInputs
        value={item?.kana}
        label="가나"
        onChangeItem={onChangeItem}
        dataKey="kana"
        languageType={'kana'}
      />

      <LabelAndInputs
        value={item?.ko}
        label="한국어"
        onChangeItem={onChangeItem}
        dataKey="ko"
        languageType={'ko'}
      />

      <LabelAndInputs
        value={item?.ro}
        label="로마자"
        onChangeItem={onChangeItem}
        dataKey="ro"
        languageType={'en'}
      />

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 2,
        }}
      >
        <Typography
          variant="caption"
          color="text.primary"
          sx={{ flexShrink: 0, ...kboFont, mb: 1 }} // 라벨은 고정 크기로 유지
        >
          예시
        </Typography>

        {example.map(({ ko = '', jp = '' }, index) => (
          <>
            <ExampleInputs
              value1={ko}
              value2={jp}
              index={index}
              onChangeExample={onChangeExample}
            />
            <Divider sx={{ my: 2 }} />
          </>
        ))}
        <Box
          onClick={onClickAddExample}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center', // 세로 방향 가운데 정렬
            justifyContent: 'center', // 가로 방향 가운데 정렬
            margin: '0 auto',
            width: '100%',
            p: 0.5,
            background: (theme) => theme.palette.green.main,
            borderRadius: 2,
            '&: hover': {
              background: (theme) => theme.palette.green.dark,
            },
          }}
        >
          <Typography variant="caption" color="text.primary">
            예시추가
          </Typography>
          <AddIcon sx={{ fontSize: 14, mr: 1 }} />
        </Box>
      </Box>

      <AlertModal
        open={modal}
        handleClose={onClose}
        title="데이터 저장"
        content="데이터를 저장하시겠어요?"
        processing={false}
        onClickCheck={() => console.info(item)}
      />
    </Box>
  );
}
