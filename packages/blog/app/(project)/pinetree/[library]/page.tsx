import Container from '@/components/academy/server/Container';

export default function Page({ params }: { params: string }) {
  const [path = ''] = Object.values(params);
  return <Container path={path} />;
}
