```html
<nz-table #table
            [nzData]="lists"
            [nzLoading]="bit.lists_loading"
            [nzNoResult]="bit.l['no_result']"
            [nzTotal]="bit.lists_totals"
            [nzPageSize]="bit.page_limit"
            [nzFrontPagination]="false"
            [(nzPageIndex)]="bit.lists_page_index"
            (nzPageIndexChange)="getLists()"
            nzSize="middle">
    <thead>
    <tr>
        <th nzShowCheckbox
            [(nzChecked)]="bit.lists_all_checked"
            [nzIndeterminate]="bit.lists_indeterminate"
            (nzCheckedChange)="bit.listsCheckAll($event,lists)"></th>
        <th>{{bit.l['username']}}</th>
        <th>{{bit.l['role']}}</th>
        <th>{{bit.l['email']}}</th>
        <th>{{bit.l['phone']}}</th>
        <th>{{bit.l['call']}}</th>
        <th>{{bit.l['status']}}</th>
        <th>{{bit.l['action']}}</th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let data of table.data">
        <td nzShowCheckbox
            [(nzChecked)]="data.checked"
            (nzCheckedChange)="bit.listsRefreshStatus(lists)"></td>
        <td>{{data.username}}</td>
        <td>{{role_lists[data.role]|JSONParse:bit.locale}}</td>
        <td>{{data.email}}</td>
        <td>{{data.phone}}</td>
        <td>{{data.call}}</td>
        <td>
            <nz-switch [nzCheckedChildren]="bit.l['on']"
                        [nzUnCheckedChildren]="bit.l['off']"
                        [(ngModel)]="data.status"
                        [nzControl]="true"
                        (click)="bit.statusChange(adminService.status(data),statusCallback)">
            </nz-switch>
        </td>
        <td>
            <a routerLink="/{admin-edit}/{{data.id}}">
            <i nz-icon type="edit"></i> {{bit.l['edit']}}
            </a>
            <nz-divider nzType="vertical"></nz-divider>
            <a (click)="deleteData(data.id)">
            <i nz-icon type="delete"></i> {{bit.l['delete']}}
            </a>
        </td>
    </tr>
    </tbody>
</nz-table>
```