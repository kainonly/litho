import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-design-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent {
  constructor(private contextMenuService: NzContextMenuService) {}

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.contextMenuService.create($event, menu);
  }

  drop(event: CdkDragDrop<string[]>): void {
    console.log(event);
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
