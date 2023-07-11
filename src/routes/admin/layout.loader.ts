import { redirect } from '@modern-js/runtime/router';

import { main } from '@services/main';

export default async () => {
  const response = await main.verify();
  if (!response.ok) {
    return redirect('/login');
  }
  return null;
};
