import { Injectable } from '@angular/core';

import { Page } from '@settings/pages/dto/page';
import { Api } from '@weplanx/components';

@Injectable()
export class TestService extends Api.resource('pages')<Page> {}
