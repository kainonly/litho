import { redirect } from '@modern-js/runtime/router';

export default async () => {
  const res = await fetch(`http://localhost:8080/xapi/info`);
  if (!res.ok) {
    return redirect('/login');
  }
  return res.json();
};
