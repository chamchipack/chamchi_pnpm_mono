import { getData } from '@/api/module/fetch';
import VocaList from '@/components/vocalist/VocaList';

interface Props {
  searchParams: { type: string };
  params: { language: string };
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
  const list: any[] = result?.data?.items || [];
  const total = result?.data?.totalItems || 0;

  return (
    <div style={{ height: 60, padding: 10 }}>
      <VocaList language={language} rows={list} total={total} type={type} />
    </div>
  );
};

export default page;
