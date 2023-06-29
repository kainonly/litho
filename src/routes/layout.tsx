import { AppstoreOutlined, CoffeeOutlined, DesktopOutlined } from '@ant-design/icons';
import { Link, Outlet } from '@modern-js/runtime/router';
import { Layout, Breadcrumb, Button, Col, Divider, Menu, message, Row, Space, theme } from 'antd';
import './layout.css';

export default () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const breadcrumbItems = [
    {
      title: <Link to="/">首页</Link>,
      key: 'home'
    }
  ];
  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Header className={'header'}>
        <Row style={{ width: '100%' }} justify={'space-between'}>
          <Col>
            <Space split={<Divider type="vertical" />}>
              <Button
                type="text"
                onClick={() => {
                  message.success('Success!');
                }}
              >
                <AppstoreOutlined />
              </Button>
              <Breadcrumb items={breadcrumbItems} />
            </Space>
          </Col>
          <Col />
          <Col />
        </Row>
      </Layout.Header>
      <Layout>
        <Layout.Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            items={[
              { key: 'example1', icon: <DesktopOutlined />, label: <Link to={'/example1'}>案例 1</Link> },
              { key: 'example2', icon: <CoffeeOutlined />, label: <Link to={'/example2'}>案例 2</Link> }
            ]}
          />
        </Layout.Sider>
        <Layout style={{ padding: '6px 8px 0' }}>
          <Layout.Content>
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
