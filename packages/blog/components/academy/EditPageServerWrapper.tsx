'use client';
import { useRecoilValue } from 'recoil';
import isEditPageon from './state';
import MarkdownEditorContainer from '@/components/Markdown-Editor/MarkdownEditorContainer';

interface Props {
  children: React.ReactNode;
}

// 서버컴포넌트 mobile 확인 감싸기
export default function EditPageServerWrapper({ children }: Props) {
  const isEditPage = useRecoilValue(isEditPageon);

  if (isEditPage)
    return (
      <MarkdownEditorContainer
        contentId={''}
        markdown_contents={''}
        markdown_tag={[]}
        markdown_title={''}
      />
    );
  else return <>{children}</>;
}
