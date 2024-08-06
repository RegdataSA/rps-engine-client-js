module.exports = {
  extends: [
    '@gitart/eslint-config-ts',
  ],

  rules: {
    'unicorn/prefer-includes': 'off',
  },

  ignorePatterns: [
    '**/lib/*',
    '**/legacy/*',
    '**/node_modules/*',
  ],
}
