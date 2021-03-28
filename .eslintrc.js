module.exports = {
    root: false,
    env: {
        node: false
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'indent': ['error', 2],
        'no-console': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    globals: {
        '$': true,
        window: true
    }
}