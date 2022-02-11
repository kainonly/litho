export class Image {
  /**
   * Editor.js API
   */
  private api: any;
  /**
   * 配置
   * @private
   */
  private config: any;
  /**
   * 只读
   * @private
   */
  private readOnly: boolean;
  /**
   *
   * @private
   */
  private blockIndex: number;
  /**
   * 样式
   * @private
   */
  private css: any = {
    wrapper: 'cdx-simple-image',
    imageHolder: 'cdx-simple-image__picture',
    caption: 'cdx-simple-image__caption'
  };
  /**
   * 节点缓存
   * @private
   */
  private nodes: Record<string, HTMLElement | null> = {
    wrapper: null,
    imageHolder: null,
    image: null,
    caption: null
  };

  private settings = [
    {
      name: 'withBorder',
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`
    },
    {
      name: 'stretched',
      icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`
    },
    {
      name: 'withBackground',
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`
    }
  ];
  /**
   * 数据
   */
  data: any = {};

  static get toolbox(): any {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  constructor({ data, api, config, readOnly }: any) {
    this.api = api;
    this.config = config;
    this.readOnly = readOnly;
    this.blockIndex = api.blocks.getCurrentBlockIndex() + 1;
    this.css = {
      baseClass: api.styles.block,
      loading: api.styles.loader,
      input: api.styles.input,
      settingsButton: api.styles.settingsButton,
      settingsButtonActive: api.styles.settingsButtonActive,
      ...this.css
    };
  }

  render(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add(this.api.styles.block, this.css.wrapper);
    const loader = document.createElement('div');
    loader.classList.add(this.css.loading);
    const imageHolder = document.createElement('div');
    imageHolder.classList.add(this.css.imageHolder);
    const image = document.createElement('img');
    const caption = document.createElement('div');
    caption.classList.add(this.css.input, this.css.caption);
    caption.contentEditable = String(!this.readOnly);
    caption.innerHTML = this.data.caption || '';
    caption.dataset['placeholder'] = 'Enter a caption';
    wrapper.append(loader);

    if (this.data.url) {
      image.src = this.data.url;
    }
    image.onload = () => {
      wrapper.classList.remove(this.css.loading);
      imageHolder.appendChild(image);
      wrapper.appendChild(imageHolder);
      wrapper.appendChild(caption);
      loader.remove();
      this.acceptTuneView();
    };
    image.onerror = e => {
      console.log('图片加载失败', e);
    };

    this.config.resolve().then((v: any) => {
      this.data = v;
      image.src = `${this.config.assets}/${v.url}`;
      caption.innerHTML = v.caption ?? '';
    });

    this.nodes['imageHolder'] = imageHolder;
    this.nodes['wrapper'] = wrapper;
    this.nodes['image'] = image;
    this.nodes['caption'] = caption;

    return wrapper;
  }

  renderSettings(): HTMLElement {
    const wrapper = document.createElement('div');

    this.settings.forEach(tune => {
      const el = document.createElement('div');

      el.classList.add(this.css.settingsButton);
      el.innerHTML = tune.icon;

      el.addEventListener('click', () => {
        this.toggleTune(tune.name);
        el.classList.toggle(this.css.settingsButtonActive);
      });

      el.classList.toggle(this.css.settingsButtonActive, this.data[tune.name]);

      wrapper.appendChild(el);
    });

    return wrapper;
  }

  save(blockContent: HTMLElement): any {
    const image = blockContent.querySelector('img'),
      caption = blockContent.querySelector(`.${this.css.input}`);

    if (!image) {
      return this.data;
    }

    return Object.assign(this.data, {
      url: image.src,
      caption: caption?.innerHTML
    });
  }

  private toggleTune(tune: string): void {
    this.data[tune] = !this.data[tune];
    this.acceptTuneView();
  }

  private acceptTuneView(): void {
    this.settings.forEach(tune => {
      this.nodes['imageHolder']?.classList.toggle(
        `${this.css.imageHolder}--${tune.name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)}`,
        !!this.data[tune.name]
      );

      if (tune.name === 'stretched') {
        this.api.blocks.stretchBlock(this.blockIndex, this.data.stretched);
      }
    });
  }
}
