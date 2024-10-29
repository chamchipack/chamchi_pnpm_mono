import Search from '@/components/search/Search';

interface Props {
  searchParams: { value: string };
  params: { language: string };
}

const page = ({ searchParams, params }: Props) => {
  const { language = '' } = params;
  return (
    <div style={{ height: 60, padding: 10 }}>
      <Search language={language} />
    </div>
  );
};

export default page;
