import Content from '@/components/academy/server/Content';

interface Props {
  params: { academy_id: string };
}

const page = async ({ params }: Props) => {
  return <Content id={params?.academy_id} />;
};

export default page;
