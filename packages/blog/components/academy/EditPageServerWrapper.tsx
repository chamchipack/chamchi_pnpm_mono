'use client';
import { useRecoilValue } from 'recoil';
import isEditPageon from './state';
import MarkdownEditorContainer from '@/components/Markdown-Editor/MarkdownEditorContainer';
import { Schema } from '@/config/schema';

interface Props {
  children: React.ReactNode;
  path: Schema;
}

// 서버컴포넌트에서 글 수정 컴포넌트인지 확인
export default function EditPageServerWrapper({ children, path }: Props) {
  // ListButtonComponent.tsx => 글 등록하기 버튼
  const isEditPage = useRecoilValue(isEditPageon);

  if (isEditPage)
    return (
      <MarkdownEditorContainer
        contentId={''}
        markdown_contents={''}
        markdown_tag={[]}
        markdown_title={''}
        path={path}
      />
    );
  else return <>{children}</>;
}
