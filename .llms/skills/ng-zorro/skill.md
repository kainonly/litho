# Ng-Zorro-Antd LLM 上下文
# 来源: https://ng.ant.design/llms.txt

## 概述
Ng-Zorro-Antd 是一个基于 Ant Design 的企业级 Angular UI 组件库。
当前版本: 21.0.0（兼容 Angular 21）

## 安装与配置
- 安装: npm install ng-zorro-antd
- 导入模块或使用独立组件
- 在 angular.json 中配置主题
- 使用 NZ_I18N 设置国际化

## 组件分类

### 通用 (General)
- Button (nz-button): 按钮，支持 primary、default、dashed、text、link 类型
- Icon (nz-icon): Ant Design 图标，使用 [nzType]
- Typography (nz-typography): 文本、标题、段落

### 布局 (Layout)
- Layout (nz-layout): 布局容器，包含 Header、Sider、Content、Footer
- Grid (nz-row, nz-col): 24 栏响应式栅格
- Flex (nz-flex): Flexbox 布局组件
- Space (nz-space): 元素间距
- Divider (nz-divider): 内容分割线

### 导航 (Navigation)
- Menu (nz-menu): 导航菜单，使用 [nzMode]
- Breadcrumb (nz-breadcrumb): 页面层级导航
- Pagination (nz-pagination): 分页导航
- Tabs (nz-tabset): 标签页
- Steps (nz-steps): 步骤条
- Dropdown (nz-dropdown): 下拉菜单

### 数据录入 (Data Entry)
- Form (nz-form): 表单布局和验证
- Input (nz-input): 文本输入框
- InputNumber (nz-input-number): 数字输入框
- Checkbox (nz-checkbox): 复选框及组
- Radio (nz-radio): 单选按钮及组
- Select (nz-select): 下拉选择
- DatePicker (nz-date-picker): 日期选择
- TimePicker (nz-time-picker): 时间选择
- Switch (nz-switch): 开关切换
- Slider (nz-slider): 滑动输入条
- Upload (nz-upload): 文件上传
- AutoComplete (nz-auto-complete): 自动完成输入
- Cascader (nz-cascader): 级联选择
- TreeSelect (nz-tree-select): 树形选择

### 数据展示 (Data Display)
- Table (nz-table): 数据表格，支持排序、筛选、分页
- List (nz-list): 基础列表
- Card (nz-card): 卡片容器
- Descriptions (nz-descriptions): 键值对展示
- Empty (nz-empty): 空状态占位
- Avatar (nz-avatar): 用户头像
- Badge (nz-badge): 徽标
- Tag (nz-tag): 标签
- Statistic (nz-statistic): 统计数值
- Tree (nz-tree): 树形结构
- Timeline (nz-timeline): 垂直时间轴
- Calendar (nz-calendar): 日历
- Collapse (nz-collapse): 折叠面板

### 反馈 (Feedback)
- Alert (nz-alert): 警告提示
- Modal (nz-modal): 对话框（NzModalService）
- Message (NzMessageService): 全局消息
- Notification (NzNotificationService): 通知提醒
- Drawer (nz-drawer): 抽屉面板
- Popconfirm (nz-popconfirm): 确认弹窗
- Popover (nz-popover): 弹出卡片
- Tooltip (nz-tooltip): 文字提示
- Progress (nz-progress): 进度条
- Spin (nz-spin): 加载中
- Result (nz-result): 结果反馈页

### 其他 (Other)
- Anchor (nz-anchor): 锚点导航
- Back Top (nz-back-top): 回到顶部
- Affix (nz-affix): 固钉
- QRCode (nz-qrcode): 二维码生成
- WaterMark (nz-water-mark): 水印

## 常用模式

### 服务端数据表格
```typescript
<nz-table
  [nzData]="listOfData"
  [nzLoading]="loading"
  [nzTotal]="total"
  [nzPageSize]="pageSize"
  [nzPageIndex]="pageIndex"
  [nzFrontPagination]="false"
  (nzQueryParams)="onQueryParamsChange($event)">
  <thead>
    <tr>
      <th nzColumnKey="name" [nzSortFn]="true">Name</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let data of listOfData">
      <td>{{ data.name }}</td>
    </tr>
  </tbody>
</nz-table>
```

### 表单验证
```typescript
<form nz-form [formGroup]="form" (ngSubmit)="onSubmit()">
  <nz-form-item>
    <nz-form-label [nzSpan]="6" nzRequired>Name</nz-form-label>
    <nz-form-control [nzSpan]="14" nzErrorTip="Please input name">
      <input nz-input formControlName="name" />
    </nz-form-control>
  </nz-form-item>
</form>
```

### 对话框服务
```typescript
this.modal.confirm({
  nzTitle: 'Confirm',
  nzContent: 'Are you sure?',
  nzOnOk: () => this.handleOk()
});
```

### 消息服务
```typescript
this.message.success('Operation successful');
this.message.error('Operation failed');
this.message.warning('Warning message');
```

## 主题定制
- 使用紧凑主题: ng-zorro-antd/ng-zorro-antd.compact.css
- 使用 LESS 变量自定义
- 使用 CSS 变量实现动态主题

## 国际化
- 导入语言包: import zh_CN from 'ng-zorro-antd/i18n';
- 提供 NZ_I18N: { provide: NZ_I18N, useValue: zh_CN }
- 支持 40+ 种语言

## 最佳实践
- 在 nz-table 中使用 OnPush 变更检测
- 对大型列表实现虚拟滚动
- 对异步操作使用 nzLoading
- 优先使用响应式表单而非模板驱动表单
- 使用 NzConfigService 进行全局配置
