import { Injectable } from '@angular/core';

import { Project } from '@common/types';
import { WpxApi } from '@weplanx/ng';

@Injectable()
export class ProjectsService extends WpxApi<Project> {
  protected override collection = 'projects';
}
