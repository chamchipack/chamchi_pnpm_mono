import SearchInput from '@/components/language/SearchInput';
import TodayWord from '@/components/language/TodayWord';
import VocaList from '@/components/language/VocaList';
import WordList from '@/components/language/WordList';
import { good } from '@/config/default';

const Main = ({ ...props }) => {
  const data = good; // 더미데이터
  return (
    <>
      <div style={{ height: 60, padding: 10 }}>
        <SearchInput />
      </div>

      <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <TodayWord language={props?.language} row={data[0]} />
      </div>

      {/* <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <WordList />
      </div>

      <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <VocaList />
      </div> */}
    </>
  );
};

export default Main;
