import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

import { WriteOffComponent } from './write-off.component';

@NgModule({ imports: [ShareModule, NzTimelineModule], declarations: [WriteOffComponent] })
export class WriteOffModule {}
