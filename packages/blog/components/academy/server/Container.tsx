'use server';
import ListButtonComponent from '../client/ListButtonComponent';
import ListContainer from './ListContainer';
import EditPageServerWrapper from '../EditPageServerWrapper';
import ImageWrapper from './ImageWrapper';

export default async function Container({ path }: { path: string }) {
  return (
    <>
      <EditPageServerWrapper>
        <ImageWrapper />

        <ListButtonComponent />

        <ListContainer path={path} />
      </EditPageServerWrapper>
    </>
  );
}
