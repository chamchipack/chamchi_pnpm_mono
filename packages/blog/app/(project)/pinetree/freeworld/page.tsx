import Container from '@/components/academy/server/Container';
import { Path } from '@/config/schema';

export default function Page() {
  return <Container path={Path.freeworld} />;
}
