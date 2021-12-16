import { Component, OnInit } from '@angular/core';

import { PagesSerivce } from '../pages.serivce';

@Component({
  selector: 'app-admin-pages-rules',
  templateUrl: './rules.component.html'
})
export class RulesComponent implements OnInit {
  constructor(private pages: PagesSerivce) {}

  ngOnInit(): void {}
}
