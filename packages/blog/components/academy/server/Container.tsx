'use server';
import ListButtonComponent from '../client/ListButtonComponent';
import List from './List';
import EditPageServerWrapper from '../EditPageServerWrapper';
import ImageWrapper from './ImageWrapper';

export default async function Container() {
  return (
    <>
      <EditPageServerWrapper>
        <ImageWrapper />

        <ListButtonComponent />

        <List />
      </EditPageServerWrapper>
    </>
  );
}
