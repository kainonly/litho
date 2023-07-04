import { Outlet } from '@modern-js/runtime/router';
import { Layout } from 'antd';
import '@/common/styles/base.scss';

export default () => {
  return (
    <Layout style={{ height: '100%', overflow: 'hidden' }}>
      <Outlet />
    </Layout>
  );
};
