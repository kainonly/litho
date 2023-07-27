import { Injectable } from '@angular/core';

import { Audit } from '@common/models/audit';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AuditService extends WpxApi<Audit> {
  protected override collection = 'logset_audit';
}
