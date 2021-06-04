export interface AlertOption {
  title: string;
  content: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'question';
  width?: number;
  okText?: string;
  okDanger?: boolean;
  okShow?: boolean;
  cancelText?: string;
  cancelShow?: boolean;
}
