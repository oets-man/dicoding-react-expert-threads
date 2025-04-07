import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import react from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  { ignores: ['dist'] },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node, // Tambahkan globals node jika perlu
        React: 'readonly', // Definisikan React secara eksplisit
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },
    rules: {
      ...daStyle.rules,
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^[A-Z_]',
          ignoreRestSiblings: true, // Ini membantu dengan destructuring
          argsIgnorePattern: '^_', // Mengabaikan args yang dimulai dengan underscore
          destructuredArrayIgnorePattern: '^_', // Mengabaikan destructured array yang dimulai dengan underscore
        },
      ],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-uses-vars': 'error', // Penting: tambahkan ini untuk mengenali variabel yang digunakan dalam JSX
      'react/prop-types': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
    settings: {
      react: {
        version: 'detect', // Otomatis mendeteksi versi React
      },
    },
  },
  eslintConfigPrettier,
];
