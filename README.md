# Weplanx Console

[![Github Actions](https://img.shields.io/github/workflow/status/weplanx/console/testing?style=flat-square)](https://github.com/weplanx/console/testing)
[![Coveralls github](https://img.shields.io/coveralls/github/weplanx/console.svg?style=flat-square)](https://coveralls.io/github/weplanx/console)
[![npm](https://img.shields.io/npm/v/weplanx/common.svg?style=flat-square)](https://www.npmjs.com/package/@weplanx/common)
[![Downloads](https://img.shields.io/npm/dm/weplanx/common.svg?style=flat-square)](https://www.npmjs.com/package/@weplanx/common)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![GitHub license](https://img.shields.io/github/license/weplanx/console?style=flat-square)](https://raw.githubusercontent.com/weplanx/console.js/main/LICENSE)

基于 Antd 集成的 Angular 组件库，低代码前端的实验项目

## 快速部署

该方式是低代码项目前端的通用方案，用于无需定制的场景，每个 `console-.x` 发布都将对应容器镜像 `x` 版本（预发布是测试版本）：

- ghcr.io/weplanx/console:latest
- ccr.ccs.tencentyun.com/weplanx/console:latest（国内）

你可以使用 Docker 上线，案例将使用 Kubernetes 部署编排，复制部署内容（需要根据情况做修改）

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: console
  name: console-deploy
spec:
  replicas: 2
  selector:
    matchLabels:
      app: console
  template:
    metadata:
      labels:
        app: console
    spec:
      containers:
        - image: ccr.ccs.tencentyun.com/weplanx/console:latest
          imagePullPolicy: Always
          name: console
          ports:
            - containerPort: 9000
---
apiVersion: v1
kind: Service
metadata:
  name: console-svc
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 9000
  selector:
    app: console
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: console
  annotations:
    # traefik.ingress.kubernetes.io/router.tls: "true"
    # traefik.ingress.kubernetes.io/router.tls.certresolver: 可选
    # traefik.ingress.kubernetes.io/router.tls.domains.0.main: 可选
    # traefik.ingress.kubernetes.io/router.tls.domains.0.sans: 可选
spec:
  rules:
    - host: <你的域名>
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: console-svc
                port:
                  number: 80
```

滚动更新，复制编排内容

```yml
spec:
  template:
    spec:
      containers:
        - image: ccr.ccs.tencentyun.com/weplanx/console:${tag}
          name: console
```

并需要自行定制触发条件，例如在 Github Actions 中 `patch deployment console-deploy --patch "$(sed "s/\${tag}/${{steps.meta.outputs.version}}/" < ./config/patch.yml)"`

## 定制



```shell
npm install @weplanx/common -S
```

| 扩展库              | 说明         |
| ------------------- | ------------ |
| @weplanx/components | 组件库       |
| @weplanx/settings   | 管理者工具库 |
| @weplanx/resources  | 服务资源库   |
| @weplanx/center     | 个人中心库   |

> 感谢 [JetBrains](https://www.jetbrains.com/?from=ngx-bit) 提供的免费开源 License 赞助
>
> [![JetBrains](https://cdn.kainonly.com/assets/jetbrains.svg)](https://www.jetbrains.com/?from=ngx-bit)

## License

[BSD-3-Clause License](https://github.com/weplanx/console/blob/main/LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fweplanx%2Fconsole.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fweplanx%2Fconsole?ref=badge_large)
