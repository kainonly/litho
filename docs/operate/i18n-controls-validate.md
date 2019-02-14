## 多语言组件同步验证

#### i18nControlsValidate(i18n: string, validate?: any)

```typescript
export function i18nControlsValidate(i18n: string, validate?: any): any[] {
  if (!validate) {
    return [];
  }
  if (validate[i18n] !== undefined) {
    return [validate[i18n]];
  } else {
    return [];
  }
}
```

- **i18n** 多语言标识
- **validate** 响应式同步验证数组