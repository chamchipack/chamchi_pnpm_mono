import SearchInput from '@/components/language/SearchInput';

interface Props {
  params: { language: string };
}

const page = ({ params }: Props) => {
  console.info(params);
  return (
    <>
      <div style={{ height: 60, padding: 10 }}>
        <SearchInput />
      </div>

      <div
        style={{ height: 200, marginTop: 20, padding: 10, background: 'red' }}
      >
        오늘의 단어
      </div>

      <div
        style={{ height: 200, marginTop: 20, padding: 10, background: 'red' }}
      >
        {' '}
        형태별 / 전체 리스트
      </div>

      <div
        style={{ height: 200, marginTop: 20, padding: 10, background: 'red' }}
      >
        {' '}
        단어장
      </div>
    </>
  );
};

export default page;
