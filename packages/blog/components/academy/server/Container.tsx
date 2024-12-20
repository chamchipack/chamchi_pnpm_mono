'use server';
import ListButtonComponent from '../client/ListButtonComponent';
import EditPageServerWrapper from '../EditPageServerWrapper';
import ImageWrapper from './ImageWrapper';
import ListContainer from './ListContainer';

export default async function Container({ path }: { path: string }) {
  return (
    <>
      <EditPageServerWrapper path={path}>
        {/* 화면 상단 이미지 */}
        <ImageWrapper />

        {/* 이미지 하단 탭 및 글작성 버튼 */}
        <ListButtonComponent />

        {/* 글 리스트 컨테이너 */}
        <ListContainer path={path} />
      </EditPageServerWrapper>
    </>
  );
}
