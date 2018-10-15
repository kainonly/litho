# 辅助服务

#### 注册 ConfigService

> `ConfigService` 服务是框架的基础配置

将服务注入主模块

```typescript
@NgModule({
  imports: [
    ...
    NgxBitModule,
    ...
  ],
  providers: [
    ...
    {
      provide: ConfigService,
      useValue: environment.bit
    },
    ...
  ],
})
export class AppModule {
}
```

#### 注册 BitService

> `BitService` 服务是框架的核心，会使用在：组件模版、组件控制器、框架组件与服务本身。

将服务注入主模块

```typescript
@NgModule({
  imports: [
    ...
    NgxBitModule,
    ...
  ],
  providers: [
    ...
    BitService
    ...
  ],
})
export class AppModule {
}
```

例子1：注入在组件

> `BitService` 请实例成 `public`，因为模版中也会使用到 `bit`

```typescript
@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit, OnDestroy {
  constructor(public bit: BitService) {
  }
}
```

例子2：注入在服务

> `BitService` 可实例成 `private`

```typescript
@Injectable()
export class AnyService {
  constructor(private bit: BitService) {
  }
}
```

#### 注册 HttpService

> `HttpService` 服务是框架的请求服务类

将服务注入主模块

```typescript
@NgModule({
  imports: [
    ...
    NgxBitModule,
    ...
  ],
  providers: [
    ...
    HttpService
    ...
  ],
})
export class AppModule {
}
```

#### 注册 EventsService

> `EventsService` 服务是框架的组件通讯服务

将服务注入主模块

```typescript
@NgModule({
  imports: [
    ...
    NgxBitModule,
    ...
  ],
  providers: [
    ...
    EventsService
    ...
  ],
})
export class AppModule {
}
```