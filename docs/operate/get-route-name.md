## 获取路由名称

#### getRouteName(url: string, start = '%7B', end = '%7D'): string

```typescript
export function getRouteName(url: string, start = '%7B', end = '%7D'): string {
  const reg1 = new RegExp(`(?:${start})(.+?)(?=${end})`, 'g');
  return url.match(reg1)[0].replace(start, '');
}
```

- **url** 完整路由地址
- **start** 起始符
- **end** 结束符
- **Return** 路由名称

可以在路由事件监听中使用

```typescript
export class DashboardsComponent implements OnInit {
    constructor(private router: Router) {
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            // current url /{admin-edit}/1
            if (event instanceof NavigationEnd) {
                getRouteName(event.url);
                // admin-edit
            }
        });
    }
}
```