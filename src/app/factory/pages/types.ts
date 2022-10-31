import { AnyDto, Page } from '@weplanx/ng';

export type PageNode = AnyDto<Page> & {
  disabled?: boolean;
  children?: PageNode[];
};

export type PageFlatNode = AnyDto<Page> & {
  expandable: boolean;
  level: number;
  disabled: boolean;
};
