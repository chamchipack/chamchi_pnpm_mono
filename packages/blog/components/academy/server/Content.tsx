import { getData } from '@/api/module/fetch';
import MarkdownPreview from '@/components/Markdown-Editor/MarkdownPreview';

interface Props {
  id: string;
  path: string;
}
export default async function Content({ id, path }: Props) {
  const params = {
    target: 'library',
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
      tag={JSON.parse(record?.tag ?? '')}
      timestamp={record?.timestamp}
      category={record?.category}
      contentId={id}
      userId={record?.userId}
      path={path}
    />
  );
}
