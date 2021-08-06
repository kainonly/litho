import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent {
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
  message: any[] = [
    {
      avatar: '/assets/users/BiazfanxmamNRoxxVxka.png',
      name: '曲丽丽',
      content: `在 <a>高逼格设计天团</a> 新建项目 <a>六月迭代</a>`
    },
    {
      avatar: '/assets/users/cnrhVkzwxjPwAaCfPbdc.png',
      name: '付小小',
      content: `在 <a>高逼格设计天团</a> 新建项目 <a>六月迭代</a>`
    },
    {
      avatar: '/assets/users/gaOngJwsRYRaVAuXXcmB.png',
      name: '林东东',
      content: `在 <a>中二少女团</a> 新建项目 <a>六月迭代</a>`
    },
    {
      avatar: '/assets/users/WhxKECPNujWoWEFNdnJE.png',
      name: '周星星',
      content: `将 <a>5 月日常迭代</a> 更新至已发布状态`
    },
    {
      avatar: '/assets/users/ubnKSIfAJTxIgXOKlciN.png',
      name: '朱偏右',
      content: `在 <a>工程效能</a> 发布了 <a>留言</a>`
    },
    {
      avatar: '/assets/users/jZUIxmJycoymBprLOUbT.png',
      name: '乐哥',
      content: `在 <a>程序员日常</a> 新建项目 <a>品牌迭代</a>`
    }
  ];
  quick: string[] = ['操作一', '操作二', '操作三', '操作四', '操作五', '操作六'];
  groups: any[] = [
    {
      avatar: '/assets/logo/alipay.png',
      group: '科学搬砖组'
    },
    {
      avatar: '/assets/logo/angular.png',
      group: '全组都是吴彦祖'
    },
    {
      avatar: '/assets/logo/antd.png',
      group: '中二少女团'
    },
    {
      avatar: '/assets/logo/antd-pro.png',
      group: '程序员日常'
    },
    {
      avatar: '/assets/logo/bootstrap.png',
      group: '高逼格设计天团'
    },
    {
      avatar: '/assets/logo/react.png',
      group: '骗你来学计算机'
    }
  ];
}
