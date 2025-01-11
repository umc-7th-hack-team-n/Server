import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginSQL from 'eslint-plugin-sql';

/** @type {import('eslint').FlatConfig[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // 브라우저 전역 변수
        ...globals.node, // Node.js 전역 변수 추가
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: pluginPrettier,
      import: pluginImport,
      sql: pluginSQL,
    },
    rules: {
      'prettier/prettier': 'error',
      // 변수명은 snake_case, 함수명은 camelCase로 제한
      'id-match': [
        'error',
        '^([a-z_]+|[a-z][a-zA-Z0-9]*)$', // snake_case 또는 camelCase 허용
        {
          properties: false, // 객체 속성 제외
          onlyDeclarations: true, // 변수 선언만 검사
          ignoreDestructuring: false, // 구조 분해 변수도 검사
        },
      ],
      'func-names': [
        'error',
        'always', // 모든 함수는 이름을 가져야 함
      ],
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'id-match': 'off', // 설정 파일에서 id-match 비활성화
    },
  },
];
