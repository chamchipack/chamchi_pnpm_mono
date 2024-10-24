interface Props {
  params: { language: string };
}

const page = ({ params }: Props) => {
  console.info(params);
  return <></>;
};

export default page;
