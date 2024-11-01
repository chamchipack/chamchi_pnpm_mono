import { getData } from '@/api/module/fetch';
import Search from '@/components/search/Search';
import { good } from '@/config/default';

interface Props {
  searchParams: { value: string };
  params: { language: string };
}

const page = async ({ searchParams, params }: Props) => {
  const { value = '' } = searchParams;
  const { language = '' } = params;
  const data = good;

  const parameter = {
    target: language,
    type: 'search',
    options: {
      query: `(jp~"${value}") || (kana~"${value}") || (ko~"${value}") || (ro~"${value}")`,
    },
    sort: {},
  };

  const { data: { items = [] } = {} } = await getData(parameter);

  return (
    <div style={{ height: 60, padding: 10 }}>
      <Search language={language} rows={items} />
    </div>
  );
};

export default page;
