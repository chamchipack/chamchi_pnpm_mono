import pb from '@/api/server/db/pocketbase';
import MarkdownPreview from '@/components/Markdown-Editor/MarkdownPreview';
import styles from '../academy.module.css';
import { getData } from '@/api/module/fetch';
import { Schema } from '@/config/schema';

interface Props {
  id: string;
  path: Schema;
}
export default async function Content({ id, path }: Props) {
  const params = {
    target: path,
    type: 'single',
    options: { id },
    sort: {},
  };
  const result = await getData(params);
  const record = result?.data;
  return (
    <MarkdownPreview
      title={record?.markdown_title}
      markdownText={record?.markdown_contents}
      readonly={true}
      tag={record?.tag}
      timestamp={record?.timestamp}
      contentId={id}
      userId={record?.userId}
      path={path}
    />
  );
}
