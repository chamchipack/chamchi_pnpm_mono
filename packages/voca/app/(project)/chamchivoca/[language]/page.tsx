import SearchInput from '@/components/language/SearchInput';
import TodayWord from '@/components/language/TodayWord';
import VocaList from '@/components/language/VocaList';
import WordList from '@/components/language/WordList';

interface Props {
  params: { language: string };
}

const page = ({ params }: Props) => {
  const { language = '' } = params;
  return (
    <>
      <div style={{ height: 60, padding: 10 }}>
        <SearchInput />
      </div>

      <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <TodayWord language={language} />
      </div>

      <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <WordList />
      </div>

      <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <VocaList />
      </div>
    </>
  );
};

export default page;
