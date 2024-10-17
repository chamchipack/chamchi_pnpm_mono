import Content from '@/components/academy/server/Content';
import { Path } from '@/config/schema';
interface Props {
  params: { academy: string };
}

const page = async ({ params }: Props) => {
  return <Content id={params?.academy} path={Path.academy} />;
};

export default page;
