import { Component, OnInit } from '@angular/core';

import { WpxSchemaService } from './wpx-schema.service';

@Component({
  selector: 'wpx-schema',
  templateUrl: './wpx-schema.component.html'
})
export class WpxSchemaComponent implements OnInit {
  constructor(private schema: WpxSchemaService) {}

  ngOnInit(): void {
    this.schema.api.find().subscribe(data => {
      console.log(data);
    });
  }
}
