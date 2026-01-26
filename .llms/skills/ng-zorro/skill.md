# Ng-Zorro-Antd LLM Context
# Source: https://ng.ant.design/llms.txt

## Overview
Ng-Zorro-Antd is an enterprise-class Angular UI component library based on Ant Design.
Current Version: 21.0.0 (compatible with Angular 21)

## Installation & Setup
- Install: npm install ng-zorro-antd
- Import modules or use standalone components
- Configure theme in angular.json
- Set up internationalization with NZ_I18N

## Component Categories

### General
- Button (nz-button): Primary, default, dashed, text, link types
- Icon (nz-icon): Ant Design icons with [nzType]
- Typography (nz-typography): Text, Title, Paragraph

### Layout
- Layout (nz-layout): Header, Sider, Content, Footer
- Grid (nz-row, nz-col): 24-column responsive grid
- Flex (nz-flex): Flexbox layout component
- Space (nz-space): Spacing between elements
- Divider (nz-divider): Content separator

### Navigation
- Menu (nz-menu): Navigation menus with [nzMode]
- Breadcrumb (nz-breadcrumb): Page hierarchy navigation
- Pagination (nz-pagination): Page navigation
- Tabs (nz-tabset): Tab panels
- Steps (nz-steps): Step indicator
- Dropdown (nz-dropdown): Dropdown menus

### Data Entry
- Form (nz-form): Form layout and validation
- Input (nz-input): Text input fields
- InputNumber (nz-input-number): Numeric input
- Checkbox (nz-checkbox): Checkbox and groups
- Radio (nz-radio): Radio buttons and groups
- Select (nz-select): Dropdown selection
- DatePicker (nz-date-picker): Date selection
- TimePicker (nz-time-picker): Time selection
- Switch (nz-switch): Toggle switch
- Slider (nz-slider): Range slider
- Upload (nz-upload): File upload
- AutoComplete (nz-auto-complete): Auto-complete input
- Cascader (nz-cascader): Cascade selection
- TreeSelect (nz-tree-select): Tree structure selection

### Data Display
- Table (nz-table): Data table with sorting, filtering, pagination
- List (nz-list): Basic list display
- Card (nz-card): Card container
- Descriptions (nz-descriptions): Key-value display
- Empty (nz-empty): Empty state placeholder
- Avatar (nz-avatar): User avatar
- Badge (nz-badge): Status badge
- Tag (nz-tag): Tag labels
- Statistic (nz-statistic): Statistics display
- Tree (nz-tree): Tree structure
- Timeline (nz-timeline): Vertical timeline
- Calendar (nz-calendar): Calendar display
- Collapse (nz-collapse): Collapsible panels

### Feedback
- Alert (nz-alert): Alert messages
- Modal (nz-modal): Dialog windows (NzModalService)
- Message (NzMessageService): Global messages
- Notification (NzNotificationService): Notifications
- Drawer (nz-drawer): Sliding panel
- Popconfirm (nz-popconfirm): Confirmation popup
- Popover (nz-popover): Popup card
- Tooltip (nz-tooltip): Tooltip hints
- Progress (nz-progress): Progress indicators
- Spin (nz-spin): Loading indicator
- Result (nz-result): Result feedback page

### Other
- Anchor (nz-anchor): Anchor navigation
- Back Top (nz-back-top): Scroll to top
- Affix (nz-affix): Sticky wrapper
- QRCode (nz-qrcode): QR code generator
- WaterMark (nz-water-mark): Watermark overlay

## Common Patterns

### Table with Server-Side Data
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

### Form with Validation
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

### Modal Service
```typescript
this.modal.confirm({
  nzTitle: 'Confirm',
  nzContent: 'Are you sure?',
  nzOnOk: () => this.handleOk()
});
```

### Message Service
```typescript
this.message.success('Operation successful');
this.message.error('Operation failed');
this.message.warning('Warning message');
```

## Theming
- Use compact theme: ng-zorro-antd/ng-zorro-antd.compact.css
- Customize with LESS variables
- Dynamic theming with CSS variables

## Internationalization
- Import locale: import zh_CN from 'ng-zorro-antd/i18n';
- Provide NZ_I18N: { provide: NZ_I18N, useValue: zh_CN }
- Support for 40+ languages

## Best Practices
- Use OnPush change detection with nz-table
- Implement virtual scroll for large lists
- Use nzLoading for async operations
- Prefer reactive forms over template-driven
- Use NzConfigService for global configuration
