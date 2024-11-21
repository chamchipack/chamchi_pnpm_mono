import { getData } from '@/api/module/fetch';
import PageError from '@/components/Error/PageError';
import VocaList from '@/components/vocalist/VocaList';
import { Language, Word, WordBase } from '@/config/defaultType';

interface Props {
  searchParams: { type: string };
  params: { language: Language };
}

const page = async ({ searchParams, params }: Props) => {
  const { type = '' } = searchParams;
  const { language = '' } = params;

  const typeParams = type ? { 'type.like': type } : {};

  const parameter = {
    target: language,
    type: 'search',
    options: {
      ...typeParams,
    },
    sort: {},
  };

  const result = await getData(parameter);
  const list: Word<WordBase>[] = result?.data?.items || [];
  const total = result?.data?.totalItems || 0;

  if (!language) return <PageError />;

  return (
    <div style={{ padding: 10 }}>
      <VocaList language={language} rows={list} total={total} type={type} />
    </div>
  );
};

export default page;
