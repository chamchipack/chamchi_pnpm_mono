import Detail from '@/components/word/Detail';

interface Props {
  params: { language: string };
}

const page = ({ params }: Props) => {
  console.info(params);
  return (
    <>
      <div style={{ height: 60, padding: 10 }}>
        <Detail />
      </div>
    </>
  );
};

export default page;
