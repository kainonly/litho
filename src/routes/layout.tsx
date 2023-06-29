import { Outlet } from '@modern-js/runtime/router';
import { Layout } from 'antd';
import './global.css';

export default () => {
  return (
    <Layout style={{ height: '100%' }}>
      <Outlet />
    </Layout>
  );
};
