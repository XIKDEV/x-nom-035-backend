module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'simple-import-sort',
    'prettier',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'plugin:eslint-plugin-complexity/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
      { usePrettierrc: true },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000', '^@?\\w'],
          // Parent imports. Put `..` last.
          ['^@/.*$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\.(?!/?$)', '^\\./(?=.*/)(?!/?$)', '^\\./?$'],
          // Style imports.
        ],
      },
    ],
    'require-await': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    quotes: ['error', 'single'],
    complexity: ['error', { max: 15 }],
    'no-empty-function': ['error', { allow: ['constructors'] }],
  },
};
