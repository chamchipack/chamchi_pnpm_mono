import Content from '@/components/academy/server/Content';
interface Props {
  params: { detail: string; library: string };
}

const page = async ({ params }: Props) => {
  return <Content id={params?.detail} path={params?.library} />;
};

export default page;
