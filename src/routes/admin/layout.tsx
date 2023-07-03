import {
  AppstoreOutlined,
  DesktopOutlined,
  MonitorOutlined,
  ProjectOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from '@modern-js/runtime/router';
import { Layout, Breadcrumb, Button, Col, Divider, Menu, Row, Space, theme, Avatar } from 'antd';

export default () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const location = useLocation();
  const current = location.pathname.replace('/admin/', '');

  const breadcrumbItems = [
    {
      title: <Link to="/admin">Admin Controls</Link>,
      key: 'home'
    }
  ];
  return (
    <>
      <Layout.Header className={'header'}>
        <Row style={{ width: '100%' }} justify={'space-between'}>
          <Col>
            <Space split={<Divider type="vertical" />}>
              <Button
                type="text"
                onClick={() => {
                  // message.success('Success!');
                }}
              >
                <AppstoreOutlined />
              </Button>
              <Breadcrumb items={breadcrumbItems} />
            </Space>
          </Col>
          <Col />
          <Col>
            <Space>
              <div>
                <Avatar icon={<UserOutlined />} />
              </div>
            </Space>
          </Col>
        </Row>
      </Layout.Header>
      <Layout>
        <Layout.Sider width={300} style={{ background: colorBgContainer, padding: '10px' }}>
          <Menu
            mode="vertical"
            selectedKeys={[current]}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              { key: 'overview', icon: <DesktopOutlined />, label: <Link to={'overview'}>Overview</Link> },
              { key: 'projects', icon: <ProjectOutlined />, label: <Link to={'projects'}>Projects</Link> },
              { key: 'monitor', icon: <MonitorOutlined />, label: <Link to={'monitor'}>Monitor</Link> },
              { type: 'divider' },
              { key: 'users', icon: <TeamOutlined />, label: <Link to={'users'}>Users</Link> },
              { key: 'settings', icon: <SettingOutlined />, label: <Link to={'settings'}>Settings</Link> }
            ]}
          />
        </Layout.Sider>
        <Layout style={{ padding: '10px 12px 0' }}>
          <Layout.Content>
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};
