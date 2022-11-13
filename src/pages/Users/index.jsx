import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { Card, Table, Button, Tag, Space, Popconfirm } from 'antd'

const columns = [
    {
        title: '用户名',
        dataIndex: 'userName',
        render: (text, record, index) => <Button type='link'><NavLink to={'/admin/users/editpower/' + index}>{text}</NavLink></Button>,
        align: 'center',
    },
    {
        title: '手机号',
        dataIndex: 'tel',
        align: 'center',
    },
    {
        title: '邮箱地址',
        dataIndex: 'address',
        align: 'center',
    },
    {
        title: '收货地址',
        dataIndex: 'address',
        align: 'center',
    },
    {
        title: '用户权限',
        dataIndex: 'power',
        render: (text, record, index) => <Button type='link'>{text}</Button>,
        align: 'center',
    },
    {
        title: '管理商品',
        dataIndex: 'products',
        render: (_, { products }) => (
            <>
                {products.map((product) => {
                    let color = product.length > 5 ? 'geekblue' : 'green';
                    if (product === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={product}>
                            {product.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
        align: 'center',
    },
    {
        title: '操作',
        dataIndex: 'action',
        render: (text, record, index) => (
            <>
                <Space size='middle'>
                    <Button><NavLink to={'/admin/users/editpower/' + index}>修改</NavLink></Button>
                    <Popconfirm
                        title='确认删除此项？'
                        okText='确定'
                        onConfirm={() => { console.log('用户确认删除！') }}
                        cancelText='取消'
                        onCancel={() => { console.log('用户取消删除！') }}
                    >
                        <Button>删除</Button>
                    </Popconfirm>
                </Space>
            </>
        ),
        align: 'center',
    },
];
const data = [
    {
        key: '1',
        userName: 'A',
        tel: 32,
        email: '11@qq.com',
        address: 'New York No. 1 Lake Park',
        power: '管理员',
        products: ['nice', 'developer'],
    },
    {
        key: '2',
        userName: 'A',
        tel: 32,
        email: '11@qq.com',
        address: 'New York No. 1 Lake Park',
        power: '普通用户',
        products: ['nice', 'developer'],
    },
    {
        key: '3',
        userName: 'A',
        tel: 32,
        email: '11@qq.com',
        address: 'New York No. 1 Lake Park',
        power: '普通用户',
        products: ['nice', 'developer'],
    },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

export default function Users() {
    const navigate = useNavigate();
    const addClick = () => {
        navigate('editpower/new');
    }

    return (
        <Card
            title='用户管理'
            headStyle={{ fontWeight: 'bold' }}
            extra={
                <Button type='primary' onClick={addClick}>
                    新增
                </Button>
            }
        >
            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </Card >
    )
}
