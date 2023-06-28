export interface Block {
  component: Component;
  metadata?: Metadata;
  data?: any;
  children?: Block[];
}

export type Component = 'row' | 'card';

export interface Metadata {
  title: string;
}
