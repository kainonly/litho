import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { ProjectsService } from '@common/projects.service';
import { Project } from '@common/types';
import { AnyDto, WpxData } from '@weplanx/ng';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  /**
   * 搜索
   */
  searchText = '';
  /**
   * 数据
   */
  dataset: WpxData<AnyDto<Project>> = new WpxData<AnyDto<Project>>();

  constructor(public app: AppService, public projects: ProjectsService, private router: Router) {}

  getData(refresh = false): void {
    this.projects.pages(this.dataset, refresh).subscribe(() => {});
  }

  submitSearch(): void {
    if (!this.searchText) {
      this.dataset.filter = {};
    } else {
      this.dataset.filter = {
        $or: [{ name: { $regex: this.searchText } }, { namespace: { $regex: this.searchText } }]
      };
    }
    this.getData(true);
  }

  /**
   * 注销登录
   */
  logout(): void {
    this.app.logout().subscribe(() => {
      this.app.user = undefined;
      this.router.navigateByUrl('/login');
    });
  }
}
