import { Outlet } from '@modern-js/runtime/router';
import { Layout } from 'antd';
import '@/common/styles/base.css';

export default () => {
  return (
    <Layout style={{ height: '100%' }}>
      <Outlet />
    </Layout>
  );
};
