## 多语言组件异步验证

#### i18nControlsAsyncValidate(i18n: string, asyncValidate?: any)

```typescript
export function i18nControlsAsyncValidate(i18n: string, asyncValidate?: any): any[] {
  if (!asyncValidate) {
    return [];
  }
  if (asyncValidate[i18n] !== undefined) {
    return [asyncValidate[i18n]];
  } else {
    return [];
  }
}
```

- **i18n** 多语言标识
- **asyncValidate** 响应式异步验证数组