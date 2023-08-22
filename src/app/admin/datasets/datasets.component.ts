import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-admin-datasets',
  templateUrl: './datasets.component.html'
})
export class DatasetsComponent implements OnInit {
  constructor(private wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.getValues(['RestControls']).subscribe(data => {
      console.log(data);
    });
  }
}
