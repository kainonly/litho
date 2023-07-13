import api from '@common/api';
import { redirect } from '@modern-js/runtime/router';

export default async () => {
  const response = await api.main.verify();
  if (!response.ok) {
    return redirect('/login');
  }
  return null;
};
