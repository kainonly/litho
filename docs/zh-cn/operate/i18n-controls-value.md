## 多语言组件初始化

#### i18nControlsValue(i18n: string, value?: any)

```typescript
export function i18nControlsValue(i18n: string, value?: any): string {
  if (!value) {
    return null;
  }
  if (value[i18n] !== undefined) {
    return value[i18n];
  } else {
    return null;
  }
}
```

- **i18n** 多语言组件标识
- **value** 多语言组件数值