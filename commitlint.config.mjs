const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'design', 'docs', 'refactor', 'style', 'chore', 'test'],
    ],
  },
};

export default config;
