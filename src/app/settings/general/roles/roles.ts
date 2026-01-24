import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-roles',
  templateUrl: './roles.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Roles {}
