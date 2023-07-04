import { useModel } from '@modern-js/runtime/model';
import { useLoaderData } from '@modern-js/runtime/router';
import { Button, Input, Card, Space, Table } from 'antd';
import users from '@models/users';
import { ClearOutlined, EllipsisOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { faker } from '@faker-js/faker';
import { LoaderData } from './page.loader';

export default () => {
  const { data } = useLoaderData() as LoaderData;
  const [{ items }, { setItems }] = useModel(users);
  if (items.length === 0) {
    setItems(data);
  }
  return (
    <>
      <Card
        bordered={false}
        title={
          <Space>
            <Input placeholder="Keyword" style={{ width: 180 }} bordered={false} />
            <Button.Group>
              <Button type="text">
                <ReloadOutlined />
              </Button>
              <Button type="text">
                <ClearOutlined />
              </Button>
              <Button type="text">
                <FilterOutlined />
              </Button>
            </Button.Group>
          </Space>
        }
        extra={
          <Button
            type="primary"
            onClick={() => {
              const create_time = faker.date.anytime();
              setItems([
                ...items,
                {
                  _id: faker.database.mongodbObjectId(),
                  email: faker.internet.email(),
                  password: faker.internet.password(),
                  name: faker.person.fullName(),
                  avatar: faker.image.avatar(),
                  status: true,
                  create_time,
                  update_time: faker.date.past({ refDate: create_time })
                }
              ]);
            }}
          >
            Add
          </Button>
        }
      >
        <Table
          size={'middle'}
          dataSource={items}
          columns={[
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email'
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name'
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status'
            },
            {
              title: 'Action',
              key: 'action',
              align: 'center',
              render: () => (
                <Space size="middle">
                  <Button type={'text'}>
                    <EllipsisOutlined />
                  </Button>
                </Space>
              )
            }
          ]}
        />
      </Card>
    </>
  );
};
