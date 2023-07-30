export type SetUserDto = {
  $set: 'email' | 'password' | 'name' | 'backup_email' | 'avatar';
  email?: string;
  password?: string;
  name?: string;
  backup_email?: string;
  avatar?: string;
};
export type UnsetUserKey = 'lark';
export type CollaborationOption = {
  url: string;
  redirect: string;
  app_id: string;
};
