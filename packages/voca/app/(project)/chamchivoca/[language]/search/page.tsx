import Search from '@/components/search/Search';
import { Box } from '@mui/material';

interface Props {
  searchParams: { value: string };
}

const page = ({ searchParams }: Props) => {
  console.info(searchParams);
  return (
    <div style={{ height: 60, padding: 10 }}>
      <Search />
    </div>
  );
};

export default page;
