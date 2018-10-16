# 配置服务 - ConfigService

##### `origin:string`

- RESTful Api 地址
- 例如，`https://api.anyone`

##### `namespace:string`

- RESTful Api 地址命名空间
- 例如，`system`，默认请设置为`''`

##### `static:string`

- 静态资源地址
- 可以是cdn域名，也可以是服务器相对路径，例如，`https://cdn.anyone/`

##### `uploads:string`

- RESTful Api 上传地址
- 追加在RESTful地址后的访问路由，例如 `main/uploads`

##### `language: any`

- 引入公共语言包，引入方式请参考 [语言包](zh-cn/language)

##### `withCredentials: boolean`

- 同源策略，XMLHttpRequest是否该使用类似cookies、authorization headers、TLS

##### `i18n: any[]`

- 多语言组件类型标识
- 例如，`['zh_cn', 'en_us']`

##### `i18n_switch: any[]`

- 多语言组件集合，`i18n` 需要于标识对应

```typescript
[
    {
        i18n: 'zh_cn',
        name: {
            zh_cn: '中文',
            en_us: 'Chinese'
        }
    },
    {
        i18n: 'en_us',
        name: {
            zh_cn: '英文',
            en_us: 'English'
        }
    }
]
```

##### `page_limit: number`

- 分页
- 推荐默认值 `20`