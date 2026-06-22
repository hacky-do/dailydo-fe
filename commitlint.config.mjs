const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'design', 'docs', 'refactor', 'style', 'chore', 'test'],
    ],
    'subject-case': [0],
  },
};

export default config;
