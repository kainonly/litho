# 获取路由ID

##### `getId(route: ActivatedRoute): Observable<any>`

- `route` 组件内实例化 `ActivatedRoute`

例如：在某个路由下的组件获取其id参数

``` typescript
constructor(private route: ActivatedRoute) {
}

ngOnInit() {
    getId(this.route).subscribe(id => {
        console.log(id);
    });
}
```