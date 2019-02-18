const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: 'babel-eslint',
  // extends: ['airbnb', 'prettier', 'prettier/react'],
  // extends: ['airbnb'],
  env: {
    jest: true,
    // browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    // 'prettier/prettier': ['error', prettierOptions],
    'default-case': 0,
    'arrow-body-style': [2, 'as-needed'],
    'arrow-parens': [2, 'always'],
    'class-methods-use-this': 0,
    'comma-dangle': [2, {
      arrays: 'never',
      objects: 'always',
      imports: 'always',
      exports: 'always',
      functions: 'ignore',
    }],
    'comma-spacing': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'key-spacing': [2, {
      mode: 'strict',
    }],
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-param-reassign': 0,
    'no-return-assign': ['error', 'except-parens'],
    'no-shadow': 0,
    'no-throw-literal': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': [2, {
      args: 'none',
      caughtErrors: 'none',
    }],
    'no-use-before-define': 0,
    'no-useless-rename': 2,
    'object-property-newline': [2, {
      'allowAllPropertiesOnSameLine': false,
    }],
    'prefer-template': 2,
    'prefer-destructuring': 0,
    'require-yield': 0,
    'semi': [2, 'never', {
      'beforeStatementContinuationChars': 'never',
    }],
  },
};
