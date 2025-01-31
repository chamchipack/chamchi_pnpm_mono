const getArticleListOrType = async (
  _: undefined,
  {
    input,
    offset = 0,
    limit = 10,
  }: {
    input?: any;
    offset?: number;
    limit?: number;
  },
) => {
  console.log(input, offset, limit);
  return 'hello';
};

export default getArticleListOrType;
