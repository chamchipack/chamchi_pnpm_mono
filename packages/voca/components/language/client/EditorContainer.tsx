import {
  Collection,
  Example,
  Language,
  Word,
  WordBase,
} from '@/config/defaultType';
import {
  Box,
  Divider,
  IconButton,
  TextField,
  Tooltip,
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
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import db from '@/api/module';
import { hiragana } from '@/config/default';
import AntSwitch from 'package/src/Interactive/AntSwitch';

interface Props {
  language: Language;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSetAlert: (title: string, value: string) => void;
}

export default function EditorContainer({
  language,
  setModalOpen,
  onSetAlert,
}: Props) {
  const [item, setItem] = useState<Word<WordBase>>();
  const [form, setForm] = useState<any | null>(null);
  const [exception, setException] = useState<boolean>(false);
  const [example, setExample] = useState<Example[]>(item?.example || []);
  const [modal, setModal] = useState(false);

  const onClose = () => setModal(false);

  const onClickSaveWord = async () => {};

  const onChangeItem = (key: string, data: any) => {
    if (key === 'type') {
      setForm(null);
      setException(false);
    }

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

  const onDeleteExample = (index: number) => {
    setExample((prev) => {
      if (index < 0 || index >= prev.length) {
        // 인덱스가 배열 범위를 벗어나면 기존 배열 반환
        return prev;
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  function getStemAndEndingRo(kana: string) {
    if (!kana || typeof kana !== 'string') {
      throw new Error('유효한 kana 문자열을 입력하세요.');
    }

    // `kana`를 split하여 각 글자로 분리
    const kanaArray = kana.split('');

    // `kana`의 마지막 글자 분리
    const endingKana = kanaArray.pop(); // 마지막 글자
    const stemKana = kanaArray.join(''); // 나머지 어간 부분

    let stemro = ''; // 어간의 로마자 변환
    let endingro = ''; // 어미의 로마자 변환

    // 어간의 로마자 변환
    for (const char of stemKana) {
      for (const group of Object.values(hiragana)) {
        const match = group.find((item) => item.jp === char);
        if (match) {
          stemro += match.ro; // 로마자 변환 추가
          break;
        }
      }
    }

    // 어미의 로마자 변환
    for (const group of Object.values(hiragana)) {
      const match = group.find((item) => item.jp === endingKana);
      if (match) {
        endingro = match.ro; // 어미의 로마자 변환
        break;
      }
    }

    return {
      stemro,
      endingro,
    };
  }

  const convertSaveForm = (type: string, value: any) => {
    if (type === 'noun') return {};
    else if (type === 'verb') {
      const stemjp = value.jp.slice(0, -1); // 마지막 문자를 제외한 어간
      const endingjp = value.jp.slice(-1); // 마지막 문자 (어미)
      const { stemro, endingro } = getStemAndEndingRo(value?.kana);
      return {
        stemjp,
        endingjp,
        stemro,
        endingro,
        form: parseInt(form),
        exception,
      };
    } else if (type === 'adj') {
      const stemjp = value.jp.slice(0, -1); // 마지막 문자를 제외한 어간
      const endingjp = value.jp.slice(-1); // 마지막 문자 (어미)
      const { stemro, endingro } = getStemAndEndingRo(value?.kana);
      return {
        stemjp,
        endingjp,
        stemro,
        endingro,
        exception,
        form: endingjp === 'い' ? 'i' : 'na',
      };
    } else if (type === 'adv') return {};
    else return {};
  };

  const onClickSave = async () => {
    onClose();

    try {
      // 빈칸 하나라도 빼먹지 마세요
      if (!item?.jp || !item?.ko || !item?.kana || !item?.ro)
        return onSetAlert('', '입력하지 않은 칸이 존재합니다');

      if (!item?.type)
        return onSetAlert('', '단어의 형태를 선택해주세요. (동사 등)');

      // 일단 명사만 하자
      // if (!['noun', 'verb', 'adj'].includes(item?.type))
      //   return onSetAlert('', '명사와 동사만 지원되는 기능입니다.');
      // 일단 명사만 가능하게

      if (item?.id) {
        // update 대상
        const convert = {
          jp: item?.jp,
          ro: item?.ro,
          kana: item?.kana,
        };

        const result = convertSaveForm(item?.type, convert);

        const form = { ...item, example, etc: result, language };

        await db.update(language as Collection, form);
      } else {
        //create 대상

        const { data = [] } = await db.search(language as Collection, {
          options: { 'jp.equal': item.jp },
        });

        const [{ jp = '', type = '' } = {}] = data;

        // 같은 단어 있는지 여부
        if (type === item?.type)
          return onSetAlert('', '이미 저장된 같은 단어가 존재합니다');

        const convert = {
          jp: item?.jp,
          ro: item?.ro,
          kana: item?.kana,
        };

        const result = convertSaveForm(item?.type, convert);

        const form = { ...item, example, etc: result, language };

        await db.create(language as Collection, form);
      }

      setModalOpen(false);
      onSetAlert('저장완료', '저장이 완료되었습니다');
    } catch {
      onSetAlert('', '');
    }
  };

  useEffect(() => {
    if (item?.example) setExample(item?.example);
    if ((item?.etc as any)?.form) setForm((item?.etc as any)?.form);
    setException((item?.etc as any)?.exception || false);
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
              setForm(null);
              setException(false);
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

      <LabelAndInputs
        value={item?.desc}
        label="참고 주석"
        onChangeItem={onChangeItem}
        dataKey="desc"
        languageType={'none'}
      />

      {item?.type === 'verb' ? (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              my: 1,
              gap: 1,
              width: '100%',
            }}
          >
            <Typography
              variant="caption"
              color="text.primary"
              sx={{ flexShrink: 0 }} // 라벨은 고정 크기로 유지
            >
              동사 그룹
            </Typography>

            <TextField
              variant="outlined"
              fullWidth
              defaultValue={form}
              value={form}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!inputValue || (parseInt(inputValue) as number) > 3) return;

                if (/^\d*$/.test(inputValue)) {
                  setForm(inputValue);
                }
              }}
              type="number"
              sx={{
                width: '70%',
                height: 40,
                backgroundColor: 'grey.200',
                color: 'common.black',
                borderRadius: 4,
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  borderRadius: 1,
                  border: 'none',
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              my: 1,
              gap: 1,
              width: '100%',
            }}
          >
            <Typography
              variant="caption"
              color="text.primary"
              sx={{ flexShrink: 0 }} // 라벨은 고정 크기로 유지
            >
              예외 단어 여부
            </Typography>
            <AntSwitch
              trackColor="text.disabled"
              checked={exception}
              onClick={async () => {
                setException(!exception);
              }}
            />
          </Box>
        </>
      ) : null}

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
              onDeleteExample={onDeleteExample}
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
    </Box>
  );
}
