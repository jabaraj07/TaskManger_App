// module.exports = {
//   root: true,
//   extends: '@react-native-community',
// };

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2018, // allows for the parsing of modern ECMAScript features
    sourceType: 'module', // allows for the use of imports
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-mixed-spaces-and-tabs': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/display-name': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react-hooks/exhaustive-deps': 1,
    'react/prop-types': ['off'],
    '@typescript-eslint/no-inferrable-types': 'off',
    'prefer-const': 'warn',
    'no-var': 'warn',
    'no-multi-spaces': 'warn',
    'space-in-parens': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-use-before-define': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    'no-irregular-whitespace': 'warn',
    '@typescript-eslint/no-extra-semi': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    'no-empty': 'warn',
    'no-sparse-arrays': 'warn',
    'react/jsx-key': 'warn',
    'no-self-assign': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
  },
  overrides: [
    {
      // Apply rule override only to files with the following extensions
      files: ['*.tsx', '*.jsx'],
      rules: {
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              '{}': false,
            },
          },
        ],
        'react/no-unescaped-entities': 0,
      },
    },
  ],
  env: {
    es6: true,
  },
};
