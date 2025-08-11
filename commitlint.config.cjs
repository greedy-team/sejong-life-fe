/* eslint-disable no-useless-escape */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+):\s(.+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  plugins: [],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'comment',
        'design',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'remove',
        'revert',
        'style',
        'test',
      ],
    ],
    'body-max-line-length': [0, 'always'],
    'footer-leading-blank': [0, 'always'],
    'footer-max-line-length': [0, 'always'],
  },
};
