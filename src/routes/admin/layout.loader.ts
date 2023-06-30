import { redirect } from '@modern-js/runtime/router';
import { info } from '@/services';

export default async () => {
  const res = await info();
  if (!res.ok) {
    return redirect('/login');
  }
  return res.json();
};
