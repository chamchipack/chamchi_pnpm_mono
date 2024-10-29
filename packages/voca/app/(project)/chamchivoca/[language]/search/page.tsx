import Search from '@/components/search/Search';
import { good } from '@/config/default';

interface Props {
  searchParams: { value: string };
  params: { language: string };
}

const page = ({ searchParams, params }: Props) => {
  const { language = '' } = params;
  const data = good;
  return (
    <div style={{ height: 60, padding: 10 }}>
      <Search language={language} rows={data} />
    </div>
  );
};

export default page;
