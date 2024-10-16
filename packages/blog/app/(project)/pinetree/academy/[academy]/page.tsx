import Content from '@/components/academy/server/Content';

interface Props {
  params: { academy: string };
}

const page = async ({ params }: Props) => {
  return <Content id={params?.academy} />;
};

export default page;
