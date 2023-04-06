export interface Order {
  no: string;
  name: string;
  description: string;
  account: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  price: number;
  valid: Date[];
  status: boolean;
}
