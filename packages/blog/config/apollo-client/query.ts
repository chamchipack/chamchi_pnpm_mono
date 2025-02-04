import { gql } from '@apollo/client';

export const getArticleListOrType = (fields: string[] | []) => {
  const defaultFields = [
    '_id',
    'markdown_title',
    'markdown_contents',
    'created',
    'category',
    'userId',
    'userName',
    'summary',
    'thumbnail',
  ];
  const queryFields = fields && fields.length > 0 ? fields : defaultFields;

  return gql`
      query getArticleListOrType($input: ArticleListSearchInput, $offset: Int, $limit: Int) {
        getArticleListOrType(input: $input, offset: $offset, limit: $limit) {
        __typename
          ${queryFields.join('\n')}
        }
      }
    `;
};
