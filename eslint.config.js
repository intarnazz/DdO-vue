import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'
import parserTypeScript from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx,ts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: vueParser,
      parserOptions: {
        parser: parserTypeScript,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    plugins: {
      '@typescript-eslint': pluginTypeScript,
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules,
    },
  },

  skipFormatting,
])
