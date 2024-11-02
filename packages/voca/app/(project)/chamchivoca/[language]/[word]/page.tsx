import { getData } from '@/api/module/fetch';
import Detail from '@/components/word/Detail';
import { good } from '@/config/default';

interface Props {
  params: { language: string; word: string };
}

const page = async ({ params }: Props) => {
  const { language = '', word = '' } = params;

  const parameter = {
    target: language,
    type: 'single',
    options: { id: word },
    sort: {},
  };

  const result = await getData(parameter);
  return (
    <>
      <div style={{ height: 60, padding: 10 }}>
        <Detail row={result?.data} language={language} />
      </div>
    </>
  );
};

export default page;
