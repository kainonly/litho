import { Component } from '@angular/core';

import { Project } from '@common/types';
import { AnyDto, WpxData } from '@weplanx/ng';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  /**
   * 数据
   */
  data: WpxData<AnyDto<Project>> = new WpxData<AnyDto<Project>>();
}
