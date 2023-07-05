import { useModel } from '@modern-js/runtime/model';
import { useLoaderData } from '@modern-js/runtime/router';
import { Button, Input, Card, Space, Table, Badge, Dropdown } from 'antd';
import users from '@models/users';
import {
  CheckOutlined,
  ClearOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  FilterOutlined,
  PlusOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { faker } from '@faker-js/faker';
import { LoaderData } from './page.loader';

export default () => {
  const { data } = useLoaderData() as LoaderData;
  const [state, action] = useModel(users);
  if (state.items.length === 0) {
    action.setItems(data);
  }
  return (
    <>
      <Card
        bordered={false}
        title={
          <Space>
            <Input placeholder="Search" style={{ width: 180 }} bordered={false} />
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
          <Space>
            {state.selectedItems.length === 0 ? undefined : (
              <Dropdown
                menu={{
                  items: [
                    {
                      danger: true,
                      key: 'delete',
                      icon: <DeleteOutlined />,
                      label: 'Delete All'
                    }
                  ]
                }}
              >
                <Button type="text" icon={<CheckOutlined />}>
                  {state.selectedItems.length} row selected
                </Button>
              </Dropdown>
            )}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                const create_time = faker.date.anytime();
                action.setItems([
                  ...state.items,
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
            />
          </Space>
        }
      >
        <Table
          size={'middle'}
          rowKey={'_id'}
          dataSource={state.items}
          columns={[
            {
              title: 'Email',
              dataIndex: 'email'
            },
            {
              title: 'Name',
              dataIndex: 'name'
            },
            {
              title: 'Status',
              dataIndex: 'status',
              render: value => (!value ? <Badge status="error" text="Off" /> : <Badge status="success" text="On" />)
            },
            {
              key: 'action',
              align: 'center',
              width: 64,
              render: () => (
                <Space size="middle">
                  <Button type={'text'}>
                    <EllipsisOutlined />
                  </Button>
                </Space>
              )
            }
          ]}
          rowSelection={{
            columnWidth: 64,
            selectedRowKeys: state.selected,
            onChange: (keys: React.Key[]) => {
              action.setSelected(keys);
            }
          }}
          pagination={{
            showSizeChanger: true,
            current: state.page,
            pageSize: state.pageSize,
            onChange: (page, pageSize) => {
              console.log(page);
              action.setPage(page);
              action.setPageSize(pageSize);
            }
          }}
        />
      </Card>
    </>
  );
};
