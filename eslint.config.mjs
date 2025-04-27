import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
      eslintPluginImport.flatConfigs.recommended
    ],
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json']
        },
        node: true
      }
    },
    processor: angular.processInlineTemplates,
    rules: {
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
      'import/no-duplicates': 'error',
      'import/no-unused-modules': 'error',
      'import/no-unassigned-import': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: false
          },
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: '{@angular/**,rxjs,rxjs/operators,ng-zorro-antd/**}',
              group: 'builtin',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: []
        }
      ],
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      '@typescript-eslint/no-empty-interface': 'off'
    }
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/label-has-associated-control': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/click-events-have-key-events': 'off'
    }
  },
  {
    files: ['*.html'],
    excludedFiles: ['*inline-template-*.component.html'],
    extends: [eslintPluginPrettierRecommended],
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
