import pb from '@/api/pocketbase';
import MarkdownPreview from '@/components/Markdown-Editor/MarkdownPreview';
import styles from '../academy.module.css';

interface Props {
  id: string;
}
export default async function Content({ id }: Props) {
  const record = await pb.collection('academy').getOne(id);
  return (
    <>
      <div className={styles['responsive-content-box']}>
        <MarkdownPreview
          title={record?.markdown_title}
          markdownText={record?.markdown_contents}
          readonly={true}
          tag={record?.tag}
          timestamp={record?.timestamp}
        />
      </div>
    </>
  );
}
