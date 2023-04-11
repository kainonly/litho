import { AnyDto, WpxApi } from '@weplanx/ng';

export interface Tag {
  name: string;
}

export interface TagFormData {
  api: WpxApi<Tag>;
  doc?: AnyDto<Tag>;
}
