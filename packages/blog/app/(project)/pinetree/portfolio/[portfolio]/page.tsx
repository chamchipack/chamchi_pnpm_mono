import Content from '@/components/academy/server/Content';
import { Path } from '@/config/schema';
interface Props {
  params: { portfolio: string };
}

const page = async ({ params }: Props) => {
  return <Content id={params?.portfolio} path={Path.portfolio} />;
};

export default page;
