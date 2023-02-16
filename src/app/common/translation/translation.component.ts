import { Component, Inject, LOCALE_ID } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html'
})
export class TranslationComponent {
  constructor(public wpx: WpxService, @Inject(LOCALE_ID) public locale: string) {}
}
