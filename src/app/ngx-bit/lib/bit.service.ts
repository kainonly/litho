import {Injectable} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {Observable, Subject} from 'rxjs';
import {ConfigService} from './config.service';
import {switchMap} from 'rxjs/operators';
import {I18nControlsOptions} from './interface';
import {FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {NzNotificationService} from 'ng-zorro-antd';

@Injectable()
export class BitService {
  /**
   * TODO:通用表单
   */
  form: FormGroup;
  /**
   * TODO:语言包标识
   */
  locale: 'zh_cn' | 'en_us' = 'zh_cn';
  /**
   * TODO:语言包标识切换监听
   */
  localeChange: Subject<'zh_cn' | 'en_us'> = new Subject();
  /**
   * TODO:模版语言包
   */
  l: any = {};
  /**
   * TODO:语言包存储
   */
  private lang: Map<string, any> = new Map<string, any>();
  /**
   * TODO:公共语言包
   */
  private common_language: any = {};
  /**
   * TODO:多语言标识
   */
  i18ns: any[] = [];
  /**
   * TODO:菜单存储
   */
  private menu: any = {};
  /**
   * TODO:被激活的路由
   */
  private actives = [];
  /**
   * TODO:面包屑数组
   */
  private breadcrumb = [];
  /**
   * TODO:列表正在加载
   */
  lists_loading = true;
  /**
   * TODO:分页
   */
  page_limit = 0;
  /**
   * TODO:列表总数
   */
  lists_totals = 0;
  /**
   * TODO:分页索引页
   */
  lists_page_index = 0;
  /**
   * TODO:列表全选
   */
  lists_all_checked = false;
  /**
   * TODO:列表不完整选择
   */
  lists_indeterminate = false;
  /**
   * TODO:列表操作板
   */
  lists_disabled_action = true;
  /**
   * TODO:列表选择数量
   */
  lists_checked_number = 0;

  /**
   * TODO:输入层多语言数值初始化
   * @param {string} i18n 多语言标识
   * @param value 数值
   * @returns {any} 数值
   */
  static i18nControlsValue(i18n: string, value?: any): string {
    if (!value) {
      return null;
    }
    if (value[i18n] !== undefined) {
      return value[i18n];
    } else {
      return null;
    }
  }

  /**
   * TODO:输入层多语言同步验证初始化
   * @param {string} i18n 多语言标识
   * @param validate 同步验证
   * @returns {any} 回调函数
   */
  static i18nControlsValidate(i18n: string, validate?: any) {
    if (!validate) {
      return [];
    }
    if (validate[i18n] !== undefined) {
      return [validate[i18n]];
    } else {
      return [];
    }
  }

  /**
   * TODO:输入层多语言异步验证初始化
   * @param {string} i18n 多语言标识
   * @param asyncValidate 异步验证
   * @returns {any} 回调函数
   */
  static i18nControlsAsyncValidate(i18n: string, asyncValidate?: any) {
    if (!asyncValidate) {
      return [];
    }
    if (asyncValidate[i18n] !== undefined) {
      return [asyncValidate[i18n]];
    } else {
      return [];
    }
  }

  constructor(private storage: LocalStorage,
              private config: ConfigService,
              private notification: NzNotificationService,
              private location: Location) {
    this.common_language = config.language;
    this.i18ns = config.i18n;
    this.page_limit = config.page_limit;
    storage.getItem('locate').subscribe(locate => {
      if (locate) {
        this.locale = locate;
      }
    });
  }

  /**
   * TODO:语言包标识设置
   * @param locale 语言包标识
   */
  setLocale(locale: 'zh_cn' | 'en_us') {
    this.storage.setItem('locate', locale).subscribe(status => {
      if (status) {
        this.locale = locale;
        this.localeChange.next(locale);
        this.l = this.lang.get(locale);
      }
    });
  }

  /**
   * TODO:构建语言包
   * @param args
   */
  buildLanguage(args ?: any): any {
    let language = this.common_language;
    if (args) {
      language = Object.assign(language, args);
    }
    this.factoryLocales(language);
    this.l = this.lang.get(this.locale);
  }

  /**
   * TODO:语言包格式处理
   * @param language
   */
  private factoryLocales(language: any) {
    const zh_cn = {};
    const en_us = {};
    for (const key in language) {
      if (language.hasOwnProperty(key)) {
        zh_cn[key] = language[key][0];
        en_us[key] = language[key][1];
      }
    }
    this.lang.set('zh_cn', zh_cn);
    this.lang.set('en_us', en_us);
  }

  /**
   * TODO:菜单数据本地存储
   * @param data
   */
  setMenu(data: any): Observable<any> {
    return this.storage.setItem('menu', data.menu).pipe(
      switchMap(status => {
        if (status) {
          return this.storage.setItem('route', data.route);
        }
      })
    );
  }

  /**
   * TODO:获取菜单属性
   */
  getMenu(route: string): Observable<any> {
    this.actives = [];
    this.breadcrumb = [];
    return this.storage.getItem('menu').pipe(
      switchMap(data => {
        this.menu = data;
        return this.storage.getItem('route');
      }),
      switchMap(data => Observable.create(observer => {
        this.actives.unshift(data[route].id);
        const bread = {
          name: data[route].name,
          routerlink: data[route].routerlink
        };
        this.breadcrumb.unshift(bread);
        if (data[route].parent !== 0) {
          this.infiniteMenu(data[route].parent);
        }
        observer.next({
          actives: this.actives,
          breadcrumb: this.breadcrumb
        });
        observer.complete();
      })));
  }

  /**
   * TODO:延续菜单计算
   * @param parent
   */
  private infiniteMenu(parent: number) {
    const data = this.menu[parent];
    this.actives.unshift(data.id);
    const bread = {
      name: data.name,
      routerlink: data.routerlink
    };
    this.breadcrumb.unshift(bread);
    if (this.menu[parent].parent !== 0) {
      this.infiniteMenu(this.menu[parent].parent);
    }
  }

  /**
   * TODO:输入层多语言数值初始化
   * @param options
   */
  i18nControls(options?: I18nControlsOptions) {
    if (options === undefined) {
      options = {};
    }
    const controls = {};
    for (const x of this.config.i18n) {
      controls[x] = [
        BitService.i18nControlsValue(x, (options.value === undefined ? '' : options.value)),
        BitService.i18nControlsValidate(x, options.validate === undefined ? '' : options.validate),
        BitService.i18nControlsAsyncValidate(x, options.asyncValidate === undefined ? '' : options.asyncValidate)
      ];
    }
    return controls;
  }

  /**
   * TODO:表单验证提示判断
   * @param {string} name formControl
   * @param {boolean} pending 是否为异步类型
   * @returns {boolean}
   */
  formExplain(name: string, pending?: boolean): boolean {
    if (pending) {
      return this.form.get(name).pending;
    }
    return !!(this.form.get(name).dirty && this.form.get(name).errors);
  }

  /**
   * TODO:表单验证类型判断
   * @param {string} name
   * @param {string} sign
   * @returns {boolean}
   */
  explain(name: string, sign: string) {
    if (sign === 'pending') {
      return this.form.get(name).pending;
    } else {
      return this.form.get(name).hasError(sign);
    }
  }

  /**
   * TODO:表单提交阻止原生与检测
   * @param event
   * @param callback
   */
  submit(event, callback) {
    event.preventDefault();
    if (this.form) {
      for (const key in this.form.controls) {
        if (this.form.controls.hasOwnProperty(key)) {
          this.form.controls[key].markAsDirty();
        }
      }
      callback(this.form.value);
    }
  }

  /**
   * TODO:返回上一级
   */
  back() {
    this.breadcrumb = [];
    this.actives = [];
    this.location.back();
  }

  /**
   * TODO:列表选择监听
   * @param lists
   */
  listsRefreshStatus(lists: any[]) {
    const all_checked = lists.every(value => value.checked === true);
    const all_unchecked = lists.every(value => !value.checked);
    this.lists_all_checked = all_checked;
    this.lists_indeterminate = (!all_checked) && (!all_unchecked);
    this.lists_disabled_action = !(this.lists_all_checked || this.lists_indeterminate);
    this.lists_checked_number = lists.filter(value => value.checked).length;
  }

  /**
   * TODO:列表全选选择监听
   */
  listsCheckAll(event, lists: any[]) {
    lists.forEach(data => data.checked = event);
    this.listsRefreshStatus(lists);
  }

  /**
   * TODO:状态更新
   * @param service
   */
  statusChange(service: Observable<any>) {
    service.subscribe(res => {
      if (!res.error) {
        this.notification.success(this.l['operate_success'], this.l['status_success']);
      } else {
        this.notification.error(this.l['operate_error'], this.l['status_error']);
      }
    });
  }
}
