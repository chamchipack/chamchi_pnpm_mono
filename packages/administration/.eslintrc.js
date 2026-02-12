module.exports = {
  // TypeScript 코드를 파싱하는 데 사용하는 파서입니다.
  parser: '@typescript-eslint/parser',

  // ESLint 규칙을 확장합니다. 여러 설정을 추가할 수 있습니다.
  extends: [
    // ESLint의 기본 추천 규칙을 사용합니다. (보편적인 규칙을 적용)
    'eslint:recommended',

    // TypeScript와 관련된 추가 ESLint 규칙을 적용합니다.
    'plugin:@typescript-eslint/recommended',

    // Prettier와 충돌하는 ESLint 규칙을 비활성화합니다. (Prettier가 스타일을 관리하도록)
    'prettier',

    // Prettier를 ESLint와 통합하여 코드 스타일 오류를 표시합니다.
    'plugin:prettier/recommended',
  ],

  // 사용할 플러그인을 지정합니다.
  plugins: [
    // TypeScript를 위한 ESLint 플러그인입니다.
    '@typescript-eslint',
    'unused-imports',
    // Prettier를 ESLint와 통합하기 위한 플러그인입니다.
    'prettier',
  ],

  // ESLint 규칙을 커스터마이징할 수 있는 부분입니다.
  rules: {
    // Prettier에서 발생하는 스타일 문제는 ESLint에서 에러로 표시합니다.
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-unused-imports': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
  },
};
