#### getRouteName(url: string, start = '%7B', end = '%7D')

- `url` 完整路由地址
- `start` 起始符
- `end` 结束符
- 返回路由名称 `string`

例如，可以在路由事件监听中使用

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