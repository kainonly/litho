import { Component, Input, OnInit } from '@angular/core';

import { Field } from '../dto/field';
import { Schema } from '../dto/schema';
import { fieldTypeValues } from '../values';

@Component({
  selector: 'app-admin-pages-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {
  @Input() fields: Field[] = [];
  type: Map<string, string> = new Map<string, string>([].concat(...(fieldTypeValues.map(v => v.values) as any[])));

  data?: Schema;

  ngOnInit() {}
}
