import { Button, Form, Input } from 'antd';

export const Basic = () => {
  return (
    <>
      <Form
        name="basic"
        layout={'vertical'}
        initialValues={{ remember: true }}
        size={'large'}
        style={{ padding: '10px 0 0' }}
        autoComplete="off"
      >
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email address!' }]}>
          <Input placeholder={'Email Address'} />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder={'Password'} />
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
