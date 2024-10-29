import Main from '@/components/language/server/Main';
interface Props {
  params: { language: string };
}

const page = ({ params }: Props) => {
  const { language = '' } = params;

  return <Main language={language} />;
};

export default page;
