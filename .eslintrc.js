module.exports = {
  plugins: ['prettier'],
  extends: [
    'react-app', // Create React App base settings
    'eslint:recommended', // recommended ESLint rules
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display Prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    'no-console': 0, //TODO: 1
    'no-debugger': 1,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'prettier/prettier': 2,
    'no-undef': 0,
  },
};
