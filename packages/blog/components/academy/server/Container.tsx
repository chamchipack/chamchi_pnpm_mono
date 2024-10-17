'use server';
import ListButtonComponent from '../client/ListButtonComponent';
import ListContainer from './ListContainer';
import EditPageServerWrapper from '../EditPageServerWrapper';
import ImageWrapper from './ImageWrapper';
import { Schema } from '@/config/schema';

export default async function Container({ path }: { path: Schema }) {
  return (
    <>
      <EditPageServerWrapper path={path}>
        <ImageWrapper />

        <ListButtonComponent />

        <ListContainer path={path} />
      </EditPageServerWrapper>
    </>
  );
}
