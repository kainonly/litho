import { AnyDto } from '@common/types';
import { model } from '@modern-js/runtime/model';

export interface User {
  email: string;
  password: string;
  name: string;
  avatar: string;
  status: boolean;
}

type State = {
  items: AnyDto<User>[];
  pending: boolean;
  error: null | Error;
  selected: React.Key[];
  page: number;
  pageSize: number;
};

export default model<State>('users').define({
  state: {
    items: [],
    pending: false,
    error: null,
    selected: [],
    page: 1,
    pageSize: 10
  },
  computed: {
    selectedItems: state => {
      return state.items.filter(v => state.selected.includes(v._id));
    }
  },
  actions: {}
});
