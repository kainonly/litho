import { SearchOption } from './search-option';
import { OrderOption } from './order-option';

export interface ListByPageOption {
  id: string;
  limit?: number;
  query: SearchOption[];
  order?: OrderOption;
}
