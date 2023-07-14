module.exports = {
  extends: '../.eslintrc.js',
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'wpx',
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
        ]
      }
    },
    {
      files: ['*.html'],
      rules: {}
    }
  ]
};
