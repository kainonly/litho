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
import { Layout, Breadcrumb, Button, Col, Divider, Menu, Row, Space, theme, Avatar, Badge } from 'antd';
import './layout.css';

const navMap: Record<string, string> = {
  '/admin': 'Admin',
  '/admin/overview': 'Overview',
  '/admin/projects': 'Projects',
  '/admin/monitor': 'Monitor',
  '/admin/users': 'Users',
  '/admin/settings': 'Settings'
};

export default () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const menuKeys: string[] = [];
  const breadcrumbItems = pathSnippets.map((v, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    menuKeys.push(v);
    return {
      key: url,
      title: <Link to={url}>{navMap[url]}</Link>
    };
  });
  return (
    <>
      <Layout.Header style={{ padding: '0 12px', zIndex: 1000, background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
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
            <div className={'center'}>
              <Badge dot>
                <Avatar shape="square" icon={<UserOutlined />} />
              </Badge>
            </div>
          </Col>
        </Row>
      </Layout.Header>
      <Layout>
        <Layout.Sider width={300} style={{ background: colorBgContainer, padding: '12px' }}>
          <Menu
            mode="vertical"
            selectedKeys={menuKeys}
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
        <Layout style={{ padding: '12px', overflowY: 'auto' }}>
          <Layout.Content>
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};
