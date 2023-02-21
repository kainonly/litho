import { Component, OnInit } from '@angular/core';

import { ProjectsService } from '@common/projects.service';
import { Project } from '@common/types';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-quick',
  templateUrl: './quick.component.html'
})
export class QuickComponent implements OnInit {
  searchText?: string;
  projects: WpxData<AnyDto<Project>> = new WpxData();

  constructor(private projectsService: ProjectsService, private ref: NzDrawerRef) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(refresh = false): void {
    this.projectsService.pages(this.projects, refresh).subscribe(() => {
      console.debug('ok');
    });
  }

  submitSearch(): void {
    if (!this.searchText) {
      this.projects.filter = {};
    } else {
      this.projects.filter = {
        $or: [{ name: { $regex: this.searchText } }, { namespace: { $regex: this.searchText } }]
      };
    }
    this.getData(true);
  }

  closeQuick(): void {
    this.ref.close();
  }
}
