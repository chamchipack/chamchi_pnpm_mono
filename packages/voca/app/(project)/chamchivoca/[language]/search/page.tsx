import { getData } from '@/api/module/fetch';
import PageError from '@/components/Error/PageError';
import Search from '@/components/search/Search';
import { Language } from '@/config/defaultType';

interface Props {
  searchParams: { value: string };
  params: { language: Language };
}

const page = async ({ searchParams, params }: Props) => {
  const { value = '' } = searchParams;
  const { language } = params;

  if (!language) return <PageError />;

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
