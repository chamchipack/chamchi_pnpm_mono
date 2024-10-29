import Detail from '@/components/word/Detail';
import { good } from '@/config/default';

interface Props {
  params: { language: string };
}

const page = ({ params }: Props) => {
  const data = good[0];
  return (
    <>
      <div style={{ height: 60, padding: 10 }}>
        <Detail row={data} />
      </div>
    </>
  );
};

export default page;
