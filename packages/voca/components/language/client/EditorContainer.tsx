import {
  Collection,
  Example,
  Language,
  Word,
  WordBase,
} from '@/config/defaultType';
import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import Chips from './Chips';
import LabelAndInputs from './Inputs';
import ExampleInputs from './ExampleInput';
import AddIcon from '@mui/icons-material/Add';
import { kboFont } from 'package/styles/fonts/module';
import AlertModal from 'package/src/Modal/SaveModal';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import db from '@/api/module';

interface Props {
  language: Language;
}

export default function EditorContainer({ language }: Props) {
  const [item, setItem] = useState<Word<WordBase>>();
  const [example, setExample] = useState<Example[]>(item?.example || []);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [content, setContent] = useState<string>('');

  const onClose = () => setModal(false);
  const onAlertClose = () => setAlert(false);

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

  const onSetAlert = (value: string) => {
    setContent(value || '');
    setAlert(true);
  };

  const convertSaveForm = (type: string, value: any) => {
    if (type === 'noun') return null;
    else if (type === 'verb') return {};
    else if (type === 'adj') return {};
    else if (type === 'adv') return {};
    else return {};
  };

  const onClickSave = async () => {
    onClose();
    console.info(item);

    // 하나라도 빼먹지 마세요
    if (!item?.jp || !item?.ko || !item?.kana || !item?.ro)
      return onSetAlert('입력하지 않은 칸이 존재합니다');

    if (!item?.type) return onSetAlert('단어의 형태를 선택해주세요. (동사 등)');

    if (item?.id) {
      // update 대상
      const form = { ...item, example };
    } else {
      //create 대상

      const { data = [] } = await db.search(language as Collection, {
        options: { 'jp.equal': item.jp },
      });

      const [{ jp = '', type = '' } = {}] = data;

      // 같은 단어 있는지 여부
      if (type === item?.type)
        return onSetAlert('이미 저장된 같은 단어가 존재합니다');

      const convert = {
        jp: item?.jp,
        ro: item?.ro,
        kana: item?.kana,
      };

      const result = convertSaveForm(item?.type, convert);

      const form = { ...item, example, etc: result };
      console.log(form);

      // await db.create(language as Collection, form)
    }

    console.info(item);
    console.info(example);
  };

  useEffect(() => {
    if (item?.example) setExample(item?.example);
  }, [item]);
  return (
    <Box sx={{ height: 500, overflowY: 'auto', p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          mb: 1,
        }}
      >
        <Tooltip title={'초기화'}>
          <IconButton
            onClick={() => {
              setItem({} as Word<WordBase>);
              setExample([]);
            }}
          >
            <RestartAltIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={'저장'}>
          <IconButton onClick={() => setModal(true)}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <SearchInput
        language={language as Language}
        routingStatus={false}
        onAddNewWord={(value) => {
          setItem(value);
        }}
      />

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="caption"
        color="text.primary"
        sx={{ flexShrink: 0, ...kboFont, mb: 1 }} // 라벨은 고정 크기로 유지
      >
        일반정보
      </Typography>

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
        onClickCheck={onClickSave}
      />

      <AlertModal
        open={alert}
        handleClose={onAlertClose}
        title="저장실패"
        content={content || '오류가 발생했습니다'}
        processing={false}
        isAlertModal={true}
        onClickCheck={() => {}}
      />
    </Box>
  );
}
