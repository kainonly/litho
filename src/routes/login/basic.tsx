import { Button, Form, Input, notification } from 'antd';
import { useNavigate } from '@modern-js/runtime/router';
import api from '@common/api';

export const Basic = () => {
  const navigate = useNavigate();
  return (
    <>
      <Form
        name="basic"
        layout={'vertical'}
        initialValues={{ remember: true }}
        size={'large'}
        style={{ padding: '10px 0 0' }}
        onFinish={async (data: any) => {
          const response = await api.main.login(data.email, data.password);
          if (!response.code) {
            navigate('/admin');
            notification.success({
              message: `Authentication`,
              description: '🚀Successful login, loading data~',
              placement: 'bottomRight'
            });
          }
        }}
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
