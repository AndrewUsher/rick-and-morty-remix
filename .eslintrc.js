module.exports = {
  parser: 'babel-eslint',
  globals: {
    fetch: 'readonly'
  },
  extends: ['@drewster/eslint-config/ts', '@drewster/eslint-config/react']
}
