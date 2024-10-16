import pb from '@/api/pocketbase';
import MarkdownPreview from '@/components/Markdown-Editor/MarkdownPreview';
import { headers } from 'next/headers';
import styles from '../academy.module.css';

interface Props {
  id: string;
}
export default async function Content({ id }: Props) {
  const headersList = headers();
  const host = headersList.get('host'); // 호스트 이름 가져오기

  const record = await pb.collection('academy').getOne(id);
  return (
    <>
      <div className={styles['responsive-content-box']}>
        <MarkdownPreview
          title={record?.markdown_title}
          markdownText={record?.markdown_contents}
          readonly={true}
        />
      </div>
    </>
  );
}
