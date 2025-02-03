import { getData } from '@/api/module/fetch';
import MarkdownPreview from '@/components/Markdown-Editor/MarkdownPreview';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client/apollo';

const queryFields = [
  'markdown_title',
  'markdown_contents',
  'created',
  'category',
  'userId',
  'tag',
];
const getOneArticleFromId = gql`
  query getOneArticleFromId($input: ID!) {
    getOneArticleFromId(input: $input) {
    __typename
      ${queryFields.join('\n')}
    }
  }
`;

interface Props {
  id: string;
  path: string;
}
export default async function Content({ id, path }: Props) {
  const { data } = await client.query({
    query: getOneArticleFromId,
    variables: { input: id },
    fetchPolicy: 'no-cache', // ✅ 항상 최신 데이터 가져오기
  });

  const item = data?.getOneArticleFromId || {};

  return (
    <MarkdownPreview
      title={item?.markdown_title}
      markdownText={item?.markdown_contents}
      readonly={true}
      tag={item?.tag || []}
      created={item?.created}
      category={item?.category}
      contentId={id}
      userId={item?.userId}
      path={path}
    />
  );
}
