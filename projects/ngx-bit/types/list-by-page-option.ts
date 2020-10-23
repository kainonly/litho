import { SearchOption } from './search-option';

export interface ListByPageOption {
  id: string;
  limit?: number;
  query: SearchOption[];
}
