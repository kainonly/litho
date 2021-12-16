import { Component, OnInit } from '@angular/core';

import { PagesSerivce } from '../pages.serivce';

@Component({
  selector: 'app-admin-pages-indexes',
  templateUrl: './indexes.component.html'
})
export class IndexesComponent implements OnInit {
  constructor(private pages: PagesSerivce) {}

  ngOnInit(): void {}
}
