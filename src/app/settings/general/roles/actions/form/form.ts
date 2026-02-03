import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
    imports: [SharedModule],
    selector: 'app-settings-roles-actions-form',
    templateUrl: './form.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Form { }
