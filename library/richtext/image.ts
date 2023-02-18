import { Config, MediaData } from './types';

export class Image {
  /**
   * Editor.js API
   */
  private api: any;
  private config: Config;
  private image?: HTMLImageElement;
  data: MediaData;

  static get toolbox(): any {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  constructor({ data, api, config }: any) {
    this.data = {
      assets: data.assets || '',
      url: data.url || ''
    };
    this.api = api;
    this.config = config;
  }

  /**
   * 渲染
   */
  render(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add(this.api.styles.block, 'cdx-media');
    const btn = document.createElement('button');
    btn.classList.add('cdx-button');
    btn.innerText = 'Please select a picture';
    btn.onclick = () => {
      this.setImage();
    };
    wrapper.append(btn);
    this.image = document.createElement('img');

    if (this.data.url) {
      this.image.src = `${this.data.assets}/${this.data.url}`;
      wrapper!.appendChild(this.image!);
      btn.remove();
    } else {
      this.image.onload = () => {
        wrapper!.appendChild(this.image!);
        btn.remove();
        this.config.change();
      };
      this.setImage();
    }

    return wrapper;
  }

  save(): MediaData {
    return this.data;
  }

  private setImage(): void {
    this.config.resolve(data => {
      this.data = data;
      this.image!.src = `${data.assets}/${data.url}`;
    });
  }
}
