import PageError from '@/components/Error/PageError';
import Main from '@/components/language/server/Main';
import { Language } from '@/config/defaultType';

interface Props {
  params: { language: Language };
}

const page = ({ params }: Props) => {
  const { language = '' } = params;

  if (!language) return <PageError />;
  return <Main language={language} />;
};

export default page;
