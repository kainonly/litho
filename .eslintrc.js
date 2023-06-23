module.exports = {
  root: true,
  ignorePatterns: ['**/*'],
  plugins: ['@nx'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      plugins: ['import'],
      rules: {
        'prettier/prettier': ['error', require('./.prettierrc.js')],
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*']
              }
            ]
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
            groups: ['external', 'builtin', 'internal', ['parent', 'sibling', 'index']],
            pathGroups: [
              {
                pattern: '{@angular/**,@nestjs/**,@prisma/**,rxjs,rxjs/operators}',
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
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nx/typescript'],
      rules: {}
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nx/javascript'],
      rules: {}
    },
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      env: {
        jest: true
      },
      rules: {}
    }
  ]
};
