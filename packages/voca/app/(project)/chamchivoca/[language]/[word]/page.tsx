import Detail from '@/components/word/Detail';

interface Props {
  params: { language: string };
}

const page = ({ params }: Props) => {
  console.info(params);
  return (
    <>
      <Detail />
    </>
  );
};

export default page;
