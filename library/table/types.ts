export interface ColumnsType<T> {
  title: string;
  dataIndex: keyof T;
  key?: string;
}
