module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'lines-between-class-members': ['error', 'always', {
      exceptAfterSingleLine: true,
    }],
    'max-len': ['error', 120],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': ['error', {
      props: false,
    }],
    'vue/script-indent': ['error', 2, {
      baseIndent: 1,
      switchCase: 1,
    }],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'indent': 'off',
      },
    },
  ],
};
