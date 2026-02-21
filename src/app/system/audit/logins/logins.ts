import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-system-logins',
  templateUrl: './logins.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Logins {}
