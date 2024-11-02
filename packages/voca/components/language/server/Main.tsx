import { getData } from '@/api/module/fetch';
import SearchInput from '@/components/language/SearchInput';
import TodayWord from '@/components/language/TodayWord';
import VocaList from '@/components/language/VocaList';
import WordList from '@/components/language/WordList';
import { good } from '@/config/default';
import { Button } from '@mui/material';
import CreateButton from '../client/CreateButton';

const Main = async ({ ...props }) => {
  const data = good; // 더미데이터
  const parameter = {
    target: props?.language,
    type: 'search',
    options: { language: props?.language },
    sort: {},
  };

  const result = await getData(parameter);
  const list: any[] = result?.data?.items || [];

  return (
    <>
      <div style={{ height: 60, padding: 10 }}>
        <SearchInput language={props?.language} />
      </div>

      <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <TodayWord language={props?.language} row={list[0]} />
      </div>

      {/* <CreateButton /> */}

      <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <WordList language={props?.language} />
      </div>

      {/* <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <VocaList />
      </div> */}
    </>
  );
};

export default Main;
