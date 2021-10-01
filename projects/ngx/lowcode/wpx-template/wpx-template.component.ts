import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wpx-template',
  templateUrl: './wpx-template.component.html'
})
export class WpxTemplateComponent implements OnInit {
  schema!: string;
  template!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.schema = data.schema;
      this.template = data.template;
    });
  }
}
