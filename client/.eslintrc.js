module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname
    },
    "plugins": ["@typescript-eslint"],
    "extends": ["airbnb-typescript", "prettier"]
}