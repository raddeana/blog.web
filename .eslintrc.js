/**
 * Eslint 配置
 * @author Philip
 */

export default {
    root: true,
    env: {
        node: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        }
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "indent": ["error", 4],
        "generator-star-spacing": "off"
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    globals: {
        window: true
    }
}
  