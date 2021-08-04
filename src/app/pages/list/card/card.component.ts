import { Component } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  data: any[] = [
    {
      title: 'Alipay',
      avatar: '/assets/logo/alipay.png'
    },
    {
      title: 'Angular',
      avatar: '/assets/logo/angular.png'
    },
    {
      title: 'Ant Design',
      avatar: '/assets/logo/antd.png'
    },
    {
      title: 'Ant Design Pro',
      avatar: '/assets/logo/antd-pro.png'
    },
    {
      title: 'Bootstrap',
      avatar: '/assets/logo/bootstrap.png'
    },
    {
      title: 'React',
      avatar: '/assets/logo/react.png'
    },
    {
      title: 'Vue',
      avatar: '/assets/logo/vue.png'
    },
    {
      title: 'Webpack',
      avatar: '/assets/logo/webpack.png'
    }
  ];
  content =
    '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。';
}
