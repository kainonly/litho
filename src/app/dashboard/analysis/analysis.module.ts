import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

import { AnalysisComponent } from './analysis.component';
import { CharacterComponent } from './chart/character.component';
import { ConversionComponent } from './chart/conversion.component';
import { EffectComponent } from './chart/effect.component';
import { KeywordComponent } from './chart/keyword.component';
import { SalesPerComponent } from './chart/sales-per.component';
import { SalesTrendComponent } from './chart/sales-trend.component';
import { SalesTypeComponent } from './chart/sales-type.component';
import { TargetComponent } from './chart/target.component';
import { TimelineComponent } from './chart/timeline.component';

const routes: Routes = [
  {
    path: '',
    component: AnalysisComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [
    AnalysisComponent,
    TargetComponent,
    TimelineComponent,
    EffectComponent,
    ConversionComponent,
    SalesTrendComponent,
    CharacterComponent,
    KeywordComponent,
    SalesPerComponent,
    SalesTypeComponent
  ]
})
export class AnalysisModule {}
