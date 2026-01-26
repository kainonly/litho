import {
  booleanAttribute,
  computed,
  Directive,
  input
} from '@angular/core';

export type TextS =
  | 'default'
  | 'pink'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'cyan'
  | 'green'
  | 'blue'
  | 'purple'
  | 'geekblue'
  | 'magenta'
  | 'volcano'
  | 'gold'
  | 'lime';

@Directive({
  selector: '[appText]',
  host: {
    // 通过 Host 绑定样式，避免直接操作 DOM。
    '[style.color]': 'textColor()',
    '[style.textDecoration]': 'textDecoration()'
  }
})
export class Text {
  // 颜色表集中管理，避免散落的 switch 逻辑。
  private readonly textColors: Record<TextS, string> = {
    default: '#000000e0',
    pink: '#c41d7f',
    red: '#cf1322',
    yellow: '#d4b106',
    orange: '#d46b08',
    cyan: '#08979c',
    green: '#389e0d',
    blue: '#096dd9',
    purple: '#531dab',
    geekblue: '#1d39c4',
    magenta: '#c41d7f',
    volcano: '#d4380d',
    gold: '#d48806',
    lime: '#7cb305'
  };

  // 文本颜色输入，允许扩展自定义色值；默认使用 "default"。
  readonly appText = input<TextS | string>('default');
  // 是否显示删除线，支持布尔属性写法。
  readonly appLine = input(false, { transform: booleanAttribute });

  // 将输入映射为最终颜色，未知值回退为默认色。
  readonly textColor = computed(() => {
    const text = this.appText();
    return (this.textColors as Record<string, string>)[text] ?? this.textColors.default;
  });

  // 基于布尔输入计算文本装饰样式。
  readonly textDecoration = computed(() => (this.appLine() ? 'line-through' : 'none'));
}
