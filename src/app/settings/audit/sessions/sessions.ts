import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-sessions',
  templateUrl: './sessions.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sessions {}
