import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  products: any[] = [
    { serial: '1234561', name: '矿泉水 550ml', code: '12421432143214321', price: 2, number: 1, amount: 2 },
    { serial: '1234562', name: '凉茶 300ml', code: '12421432143214322', price: 3, number: 2, amount: 6 },
    { serial: '1234563', name: '好吃的薯片', code: '12421432143214323', price: 7, number: 4, amount: 28 },
    { serial: '1234564', name: '特别好吃的蛋卷', code: '12421432143214324', price: 8.5, number: 3, amount: 25.5 }
  ];
  projectsTotal = 0;
  projectsAmount = 0;
  loads: any[] = [
    { date: '2017-10-01 14:10', comment: '联系客户', status: 1, user: { id: 1234, type: 'staff' }, time: '5mins' },
    { date: '2017-10-01 14:05', comment: '取货员出发', status: 2, user: { id: 1234, type: 'staff' }, time: '1h' },
    { date: '2017-10-01 13:05', comment: '取货员接单', status: 2, user: { id: 1234, type: 'staff' }, time: '5mins' },
    { date: '2017-10-01 13:00', comment: '申请审批通过', status: 2, user: { id: 1, type: 'admin' }, time: '1h' },
    { date: '2017-10-01 12:00', comment: '发起退货申请', status: 2, user: { id: 4321, type: 'member' }, time: '5mins' }
  ];

  ngOnInit(): void {
    this.products.forEach(value => {
      this.projectsTotal += value.number;
      this.projectsAmount += value.amount;
    });
  }
}
