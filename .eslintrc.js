/**
 * Eslint 配置
 * @author Philip
 */

module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "indent": ["error", 4],
        "generator-star-spacing": "off"
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    globals: {
        "window": true
    }
}
  