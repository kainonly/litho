module.exports = {
  extends: '../.eslintrc.js',
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['library/tsconfig.lib.json', 'library/tsconfig.spec.json'],
        createDefaultProgram: true
      },
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: ['wpx'],
            style: 'camelCase'
          }
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'wpx',
            style: 'kebab-case'
          }
        ],
        '@angular-eslint/directive-class-suffix': [
          'error',
          {
            suffixes: ['Directive', 'Component', 'Base']
          }
        ]
      }
    },
    {
      files: ['*.html'],
      rules: {}
    }
  ]
};
