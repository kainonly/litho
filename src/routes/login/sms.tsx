import { Button, Col, Form, Input, Row, Space } from 'antd';

export const Sms = () => {
  return (
    <>
      <Form
        name="sms"
        layout={'vertical'}
        initialValues={{ remember: true }}
        size={'large'}
        style={{ padding: '10px 0 0' }}
        autoComplete="off"
      >
        <Form.Item name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
          <Space.Compact>
            <Input style={{ width: '20%' }} defaultValue="+1" />
            <Input style={{ width: '80%' }} placeholder={'Phone Number'} />
          </Space.Compact>
        </Form.Item>

        <Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: 'Please input the verification code you got!' }]}
              >
                <Input placeholder={'Verification Code'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Send</Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block={true}>
            Continue
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
