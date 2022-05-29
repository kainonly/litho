import { Component, OnInit } from '@angular/core';

import { UserInfo, WpxService } from '@weplanx/ng';

@Component({
  selector: 'wpx-center-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  projects: any[] = [
    {
      title: 'Alipay',
      avatar: '/assets/logo/alipay.png',
      description: '那是一种内在的东西，他们到达不了，也无法触及的',
      group: '科学搬砖组',
      time: '几秒前'
    },
    {
      title: 'Angular',
      avatar: '/assets/logo/angular.png',
      description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
      group: '全组都是吴彦祖',
      time: '4 年前'
    },
    {
      title: 'Ant Design',
      avatar: '/assets/logo/antd.png',
      description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
      group: '中二少女团',
      time: '几秒前'
    },
    {
      title: 'Ant Design Pro',
      avatar: '/assets/logo/antd-pro.png',
      description: '那时候我只会想自己想要什么，从不想自己拥有什么',
      group: '程序员日常',
      time: '4 年前'
    },
    {
      title: 'Bootstrap',
      avatar: '/assets/logo/bootstrap.png',
      description: '凛冬将至',
      group: '高逼格设计天团',
      time: '4 年前'
    },
    {
      title: 'React',
      avatar: '/assets/logo/react.png',
      description: '生命就像一盒巧克力，结果往往出人意料',
      group: '骗你来学计算机',
      time: '4 年前'
    }
  ];

  constructor(public wpx: WpxService) {}

  ngOnInit(): void {}
}
