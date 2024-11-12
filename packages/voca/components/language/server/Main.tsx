import { getData } from '@/api/module/fetch';
import SearchInput from '@/components/language/SearchInput';
import TodayWord from '@/components/language/TodayWord';
import VocaList from '@/components/language/VocaList';
import WordList from '@/components/language/WordList';
import CreateButton from '../client/CreateButton';
import { Language, Verb, Word, WordBase } from '@/config/defaultType';
import WordEditor from '../client/WordEditor';
import ServerClientAdapter from '../client/ServerClientAdapter';

interface Props {
  language: Language;
}

const Main = async ({ ...props }: Props) => {
  const parameter = {
    target: props?.language,
    type: 'search',
    options: { language: props?.language },
    sort: {},
  };

  const result = await getData(parameter);
  const list: Word<WordBase>[] = result?.data?.items || [];

  return (
    <>
      <div style={{ height: 60, padding: 10 }}>
        <SearchInput language={props?.language} routingStatus={true} />
      </div>

      <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <TodayWord language={props?.language} row={list[0]} />
      </div>

      {/* <CreateButton /> */}
      <ServerClientAdapter>
        <WordEditor language={props?.language} />
      </ServerClientAdapter>

      <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <WordList language={props?.language} />
      </div>

      {/* <div style={{ height: 200, marginTop: 20, padding: 10 }}>
        <VocaList language={props?.language} />
      </div> */}
    </>
  );
};

export default Main;
