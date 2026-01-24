import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-permissions',
  templateUrl: './permissions.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Permissions {}
