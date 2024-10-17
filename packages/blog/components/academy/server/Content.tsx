import pb from '@/api/server/db/pocketbase';
import MarkdownPreview from '@/components/Markdown-Editor/MarkdownPreview';
import styles from '../academy.module.css';
import { getData } from '@/api/module/fetch';

interface Props {
  id: string;
}
export default async function Content({ id }: Props) {
  const params = {
    target: 'academy',
    type: 'single',
    options: { id },
    sort: {},
  };
  const result = await getData(params);
  const record = result?.data;
  // const record = await pb.collection('academy').getOne(id);
  return (
    <MarkdownPreview
      title={record?.markdown_title}
      markdownText={record?.markdown_contents}
      readonly={true}
      tag={record?.tag}
      timestamp={record?.timestamp}
      contentId={id}
      userId={record?.userId}
    />
  );
}
