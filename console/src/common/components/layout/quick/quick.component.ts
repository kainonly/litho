import { Component, OnInit } from '@angular/core';

import { Project } from '@common/interfaces/project';
import { ProjectsService } from '@common/services/projects.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-layout-quick',
  templateUrl: './quick.component.html'
})
export class QuickComponent implements OnInit {
  ds: WpxData<AnyDto<Project>> = new WpxData();
  searchText?: string;

  constructor(private projects: ProjectsService, private ref: NzDrawerRef) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(refresh = false): void {
    this.projects.pages(this.ds, refresh).subscribe(() => {
      console.debug('ok');
    });
  }

  submitSearch(): void {
    if (!this.searchText) {
      this.ds.filter = {};
    } else {
      this.ds.filter = {
        $or: [{ name: { $regex: this.searchText } }, { namespace: { $regex: this.searchText } }]
      };
    }
    this.getData(true);
  }

  closeQuick(): void {
    this.ref.close();
  }
}
