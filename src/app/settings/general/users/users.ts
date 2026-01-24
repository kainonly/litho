import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-users',
  templateUrl: './users.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Users {}
