import { Component, OnInit } from '@angular/core';

import { AclService } from './acl.service';

@Component({
  selector: 'app-system-acl',
  templateUrl: './acl.component.html'
})
export class AclComponent implements OnInit {
  constructor(private acl: AclService) {}

  ngOnInit(): void {}
}
