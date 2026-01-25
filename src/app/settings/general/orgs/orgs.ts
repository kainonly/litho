import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  imports: [SharedModule],
  selector: 'app-settings-orgs',
  templateUrl: './orgs.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Orgs {
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
}
