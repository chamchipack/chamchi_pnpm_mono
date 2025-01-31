import { gql } from '@apollo/client';

export const createArticleMutation = (fields: string[] | []) => {
  const defaultFields = ['status', '_id'];

  return gql`
    mutation createArticle($input: ArticleCreateInput) {
      createArticle(input: $input) {
        ${defaultFields.join('\n')}
      }
    }
  `;
};

export const updateArticleMutation = (fields: string[] | []) => {
  const defaultFields = ['status', '_id'];

  return gql`
    mutation updateArticle($_id: ID!, $input: ArticleUpdateInput) {
      updateArticle(_id: $_id, input: $input) {
        ${defaultFields.join('\n')}
      }
    }
  `;
};

export const deleteArticleMutation = (fields: string[] | []) => {
  const defaultFields = ['status', 'deletedCount'];

  return gql`
      mutation deleteArticle($input: ID!) {
        deleteArticle(input: $input) {
          ${defaultFields.join('\n')}
        }
      }
    `;
};
