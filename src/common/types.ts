export interface SetUserDto {
  key: Omit<keyof SetUserDto, 'key' | 'phone_code'>;
  email?: string;
  name?: string;
  avatar?: string;
  password?: string;
  phone?: string;
  phone_code?: string;
}
export type UnsetUserKey = 'lark';
export interface CollaborationOption {
  url: string;
  redirect: string;
  app_id: string;
}
