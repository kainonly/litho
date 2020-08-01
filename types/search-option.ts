export interface SearchOption {
  field: string;
  op: string;
  value: any;
  must?: boolean;
}
