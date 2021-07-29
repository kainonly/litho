import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { Sankey } from '@antv/g2plot';

@Component({
  selector: 'app-analysis-charts-target',
  template: ` <div #ref> </div>`
})
export class TargetComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Sankey;

  ngAfterViewInit(): void {
    this.chart = new Sankey(this.ref.nativeElement, {
      data: [
        { source: '首次打开', target: '首页 UV', value: 160 },
        { source: '结果页', target: '首页 UV', value: 40 },
        { source: '验证页', target: '首页 UV', value: 10 },
        { source: '我的', target: '首页 UV', value: 10 },
        { source: '朋友', target: '首页 UV', value: 8 },
        { source: '其他来源', target: '首页 UV', value: 27 },
        { source: '首页 UV', target: '服务 A', value: 30 },
        { source: '首页 UV', target: '扫一扫', value: 40 },
        { source: '首页 UV', target: '服务 B', value: 35 },
        { source: '首页 UV', target: '服务 C', value: 25 },
        { source: '首页 UV', target: '服务 E', value: 10 },
        { source: '首页 UV', target: '服务 D', value: 30 },
        { source: '首页 UV', target: '服务 H', value: 40 },
        { source: '首页 UV', target: '其他流向', value: 45 }
      ],
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
      nodeWidthRatio: 0.008,
      nodePaddingRatio: 0.03
    });
    this.chart.render();
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
