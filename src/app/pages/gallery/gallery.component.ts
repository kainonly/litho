import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {
  constructor(
    public bit: BitService
  ) {
  }

  ngOnInit(): void {
  }
}
