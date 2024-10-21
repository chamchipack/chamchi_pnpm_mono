import Content from '@/components/academy/server/Content';
import { Path } from '@/config/schema';
interface Props {
  params: { freeworld: string };
}

const page = async ({ params }: Props) => {
  return <Content id={params?.freeworld} path={Path.freeworld} />;
};

export default page;
