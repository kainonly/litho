import { CopyrightOutlined, GithubOutlined, SelectOutlined } from '@ant-design/icons';
import { Avatar, Button, Carousel, Col, Divider, Layout, Row, Space, Tabs, Typography } from 'antd';
import { Sms } from '@/routes/login/sms';
import { Basic } from '@/routes/login/basic';

export default () => {
  return (
    <>
      <Row style={{ height: '100%' }}>
        <Col span={12} style={{ background: '#fff' }}>
          <Layout style={{ height: '100%' }}>
            <Layout.Header style={{ background: '#fff' }}>
              <Button size={'large'} type="text" icon={<GithubOutlined />}>
                <b>STAR</b>
              </Button>
            </Layout.Header>
            <Layout.Content style={{ background: '#fff', flex: '1 1 auto' }}>
              <div style={{ maxWidth: 360, margin: '9% auto 0' }}>
                <Typography.Title level={2}>SIGN IN</Typography.Title>
                <Tabs
                  size={'large'}
                  items={[
                    {
                      key: 'basic',
                      label: 'EMAIL',
                      children: <Basic />
                    },
                    {
                      key: 'sms',
                      label: 'SMS',
                      children: <Sms />
                    }
                  ]}
                />
                <Divider plain style={{ marginTop: 0 }}>
                  Or
                </Divider>
                <Space>
                  <a>
                    <Avatar size={36} src={<img src={'https://cdn.kainonly.com/assets/Lark.png'} alt="lark" />} />
                  </a>
                </Space>
              </div>
            </Layout.Content>

            <Layout.Footer style={{ background: '#fff', textAlign: 'center' }}>
              <Space direction={'vertical'}>
                <Typography.Link style={{ color: 'rgba(0, 0, 0, 0.85)' }} strong>
                  <span>BSD-3-Clause License </span>
                  <SelectOutlined />
                </Typography.Link>
                <Typography.Text strong>
                  Copyright <CopyrightOutlined /> 2023. Open Source DevOps by WEPLANX.
                </Typography.Text>
              </Space>
            </Layout.Footer>
          </Layout>
        </Col>
        <Col
          span={12}
          style={{
            backgroundImage: 'url(https://cdn.kainonly.com/assets/bg.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '100%'
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginTop: '20%'
            }}
          >
            <Carousel autoplay dots={false} dotPosition={'left'}>
              <Typography.Title level={2}>DEPLOYMENT</Typography.Title>
              <Typography.Title level={2}>CONNECTOR</Typography.Title>
              <Typography.Title level={2}>SCHEDULE</Typography.Title>
              <Typography.Title level={2}>LOW-CODE</Typography.Title>
            </Carousel>
            <Typography.Title style={{ marginTop: 0 }} level={2}>
              DevOps Manage Easily With
            </Typography.Title>
            <div style={{ marginTop: -32 }}>
              <img height={256} src={'https://cdn.kainonly.com/assets/weplanx_transparent.png'} alt={'weplanx'} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
