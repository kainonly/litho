import { model } from '@modern-js/runtime/model';
import { AnyDto, BasicState } from '@common/types';

export interface Users {
  email: string;
  password: string;
  name: string;
  avatar: string;
  status: boolean;
}

type State = BasicState<AnyDto<Users>>;

export default model<State>('users').define({
  state: {
    items: [],
    pending: false,
    error: null
  },
  computed: {},
  actions: {}
});
