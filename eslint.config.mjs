import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: {
      prettier,
      import: importPlugin,
      'unused-imports': unusedImports
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: false },
          'newlines-between': 'always',
          groups: ['external', 'builtin', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '{@angular/**,rxjs,rxjs/operators,ng-zorro-antd/**}',
              group: 'external',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: []
        }
      ]
    }
  },
  {
    files: ['**/*.html'],
    plugins: {
      prettier
    },
    extends: [angular.configs.templateRecommended],
    rules: {
      'prettier/prettier': [
        'error',
        {
          parser: 'angular'
        }
      ]
    }
  }
);
