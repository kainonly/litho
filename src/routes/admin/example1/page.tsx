import { useState } from 'react';
import { Button, Card, Input, Space, Table, Tag } from 'antd';
import { ClearOutlined, EllipsisOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

const title = (
  <Space>
    <Input placeholder="搜索关键词" style={{ width: 180 }} bordered={false} />
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
);

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  },
  {
    title: '操作',
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
];

export default () => {
  const [data, setValue] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]);

  return (
    <Card
      title={title}
      bordered={false}
      extra={
        <Button
          type="primary"
          onClick={() => {
            setValue([
              ...data,
              {
                key: Math.random().toString(),
                name: 'Kain',
                age: 30,
                address: 'Sanya',
                tags: ['full stack', 'devops']
              }
            ]);
          }}
        >
          新增
        </Button>
      }
    >
      <Table size={'middle'} columns={columns} dataSource={data} />
    </Card>
  );
};
