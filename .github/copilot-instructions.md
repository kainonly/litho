# Copilot Instructions (Litho)

Use the rule files in `./.llms` when working in this repo. Project rules override on conflict.

## Context Files (Skills)

- `./.llms/skills/project/skill.md` - Project-specific conventions, architecture, and coding standards
- `./.llms/skills/angular/skill.md` - Angular 21 framework rules and best practices
- `./.llms/skills/ng-zorro/skill.md` - Ng-Zorro-Antd component library guidelines

## Key Points

1. **All components MUST be standalone** - No NgModule usage
2. **Use signals for reactive state** - Prefer signals over RxJS when possible
3. **LESS for styling** - All component styles use LESS preprocessor
4. **Bun package manager** - Use `bun` commands, not npm
5. **Type safety** - Follow TypeScript strict mode
6. **Ng-Zorro components** - Use Ng-Zorro for all UI components

## Priority

Project-specific rules in `project.md` take precedence over framework rules when there's a conflict.
