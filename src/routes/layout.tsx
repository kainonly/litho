import { Outlet } from '@modern-js/runtime/router';
import { Layout, ConfigProvider } from 'antd';
import './layout.css';

export default () => {
  return (
    <ConfigProvider>
      <Layout style={{ height: '100%', overflow: 'hidden' }}>
        <Outlet />
      </Layout>
    </ConfigProvider>
  );
};
