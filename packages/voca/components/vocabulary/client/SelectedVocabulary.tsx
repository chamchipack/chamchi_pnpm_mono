import React, { useEffect, useState } from 'react';
import db from '@/api/module';
import { usePathname } from 'next/navigation';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import PaginationComponent from 'package/src/Pagination/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SaveModal from 'package/src/Modal/SaveModal';

import VocabularyHeader from './VocabularyHeader';
import VocabularyItem from './VocabularyItem';
import { Word, WordBase, Language } from '@/config/defaultType';
import SearchInput from '@/components/language/SearchInput';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Props {
  data: any;
  onClickReset: () => void;
  onLoadVocaList: (value: number) => void;
  mode: string | 'create' | 'update';
}

const SelectedVocabulary = ({ data, onClickReset, onLoadVocaList }: Props) => {
  const path = usePathname();
  const [, , language] = path.split('/');

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Word<WordBase>[]>([]);
  const [memorized, setMemorized] = useState<string[]>(data?.memorized || []);
  const [total, setTotal] = useState(0);
  const [wordArray, setWordArray] = useState<string[]>(data?.wordId || []);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [hiddenStates, setHiddenStates] = useState<{
    [key: string]: {
      titleHidden: boolean;
      kanaHidden: boolean;
      koHidden: boolean;
    };
  }>({});
  const [allTitlesHidden, setAllTitlesHidden] = useState(false);
  const [allKanaHidden, setAllKanaHidden] = useState(false);
  const [allKoHidden, setAllKoHidden] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(data?.name || '');
  const [modalProcessing, setModalProcessing] = useState<boolean>(false);

  const handleClose = () => setModal(false);

  const onLoadData = async (page: number) => {
    setLoading(true);

    if (!wordArray.length) {
      setRows([]);
      setTotal(0);
      setLoading(false);

      return;
    }

    const { data: result = [] } = await db.search('japanese', {
      options: { 'id.or': wordArray, 'language.like': language },
      pagination: { page, perPage: 10 },
    });

    const _result = Array.isArray(result) ? result : result?.items;

    setRows(_result);
    setTotal(result?.totalItems);
    setLoading(false);
  };

  const onClickDelete = async (id: string) => {
    if (!id) return;
    const result = wordArray.filter((item) => item !== id) || [];

    setWordArray(result);

    if (memorized.includes(id)) {
      await delay(400);
      handleCheckboxChange(id);
    }
  };

  const onClickSave = async (mode: boolean) => {
    if (!mode || !data?.id) return;
    const result = Array.from(new Set(wordArray));

    const form = {
      id: data?.id,
      name: title,
      wordId: result,
    };

    await db.update('vocabulary', form);
    // onLoadVocaList(1);
  };

  const onClickDeleteVoca = async () => {
    if (!data.id) return;
    setModalProcessing(true);

    await db.delete('vocabulary', data?.id);
    setModalProcessing(false);
    onLoadVocaList(1);
    onClickReset();
  };

  const handleCheckboxChange = async (itemId: string) => {
    const result = memorized.includes(itemId)
      ? memorized.filter((id) => id !== itemId) // 이미 포함되어 있으면 제거
      : [...memorized, itemId];

    setMemorized(result);

    const form = {
      id: data?.id,
      name: title,
      memorized: result,
    };
    await db.update('vocabulary', form);
  };

  useEffect(() => {
    onLoadData(pagination.page);
  }, [wordArray]);

  const toggleVisibility = (
    id: string,
    field: 'titleHidden' | 'kanaHidden' | 'koHidden',
  ) => {
    setHiddenStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));
  };

  const handleTitleChipClick = () => {
    setAllTitlesHidden((prev) => !prev);
    setHiddenStates((prev) => {
      const newState = { ...prev };
      rows.forEach((item) => {
        newState[item.id] = {
          ...newState[item.id],
          titleHidden: !allTitlesHidden,
        };
      });
      return newState;
    });
  };

  const handleKanaChipClick = () => {
    setAllKanaHidden((prev) => !prev);
    setHiddenStates((prev) => {
      const newState = { ...prev };
      rows.forEach((item) => {
        newState[item.id] = {
          ...newState[item.id],
          kanaHidden: !allKanaHidden,
        };
      });
      return newState;
    });
  };

  const handleKoChipClick = () => {
    setAllKoHidden((prev) => !prev);
    setHiddenStates((prev) => {
      const newState = { ...prev };
      rows.forEach((item) => {
        newState[item.id] = {
          ...newState[item.id],
          koHidden: !allKoHidden,
        };
      });
      return newState;
    });
  };

  const onAddNewWord = (value: any) => {
    const arraySet = new Set(data?.wordId);

    // 찾고자 하는 값
    const valueToFind = value?.id;

    // Set을 사용하여 효율적으로 값 존재 여부 확인
    if (arraySet.has(valueToFind)) {
      // console.log(`${valueToFind}는 배열에 존재합니다.`);
    } else {
      // console.log(`${valueToFind}는 배열에 존재하지 않습니다.`);
      if (valueToFind) setWordArray([value?.id, ...wordArray]);
    }
  };

  return (
    <>
      <VocabularyHeader
        name={title}
        setTitle={setTitle}
        onClickReset={onClickReset}
        onLoadVocaList={onLoadVocaList}
        onDeleteVocabulary={() => setModal(true)}
        editmode={editmode}
      />

      <SaveModal
        open={modal}
        onClickCheck={onClickDeleteVoca}
        handleClose={handleClose}
        title="단어장 삭제"
        content="삭제하시겠습니까?"
        isAlertModal={false}
        processing={modalProcessing}
      />

      <Box
        sx={{
          my: 2,
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {editmode ? (
          <Box my={3} width="80%">
            <SearchInput
              language={language as Language}
              routingStatus={false}
              onAddNewWord={onAddNewWord}
            />
          </Box>
        ) : (
          <Box>
            <Chip
              label={allTitlesHidden ? '단어 보이기' : '단어 가리기'}
              clickable
              onClick={handleTitleChipClick}
              color={'default'}
              sx={{ mr: 1 }}
            />
            <Chip
              label={allKanaHidden ? '발음 보이기' : '발음 가리기'}
              clickable
              onClick={handleKanaChipClick}
              color={'default'}
              sx={{ mr: 1 }}
            />
            <Chip
              label={allKoHidden ? '뜻 보이기' : '뜻 가리기'}
              clickable
              onClick={handleKoChipClick}
              color={'default'}
            />
          </Box>
        )}
        <Tooltip title={editmode ? '저장하기' : '수정하기'}>
          <IconButton
            onClick={() => {
              if (editmode) onClickSave(editmode);
              setEditmode(!editmode);
            }}
          >
            {!editmode ? (
              <EditIcon color={'info'} />
            ) : (
              <SaveAsIcon color="success" />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {rows.map((item) => (
        <VocabularyItem
          key={item.id}
          item={item}
          setMemorized={setMemorized}
          isMemorized={memorized.includes(item.id)}
          hiddenState={hiddenStates[item.id] || {}}
          toggleVisibility={toggleVisibility}
          editmode={editmode}
          onDelete={onClickDelete}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}

      <PaginationComponent
        total={total}
        pagination={pagination}
        setPagination={setPagination}
        onClickSearch={onLoadData}
      />
    </>
  );
};

export default SelectedVocabulary;
