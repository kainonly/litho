import { SweetAlertIcon } from 'sweetalert2';

export interface AlertOption {
  title: string;
  content: string;
  type: SweetAlertIcon;
  width?: number;
  okText?: string;
  okDanger?: boolean;
  okShow?: boolean;
  cancelText?: string;
  cancelShow?: boolean;
}
