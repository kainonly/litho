import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent {
  salesChannel = 0;
  hots = [
    { keyword: '搜索关键词-A', users: 176, increase: 0.28 },
    { keyword: '搜索关键词-B', users: 556, increase: -0.68 },
    { keyword: '搜索关键词-C', users: 904, increase: 0.8 },
    { keyword: '搜索关键词-D', users: 254, increase: 0.9 },
    { keyword: '搜索关键词-E', users: 246, increase: 0.42 }
  ];
  statisticsIndex = 0;
}
