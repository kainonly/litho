export interface Menu {
  name: string;
  disabled: boolean;
  icon?: string;
  link?: string;
  children: Omit<Menu, 'children'>[];
}
