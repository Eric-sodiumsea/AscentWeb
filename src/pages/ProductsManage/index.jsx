import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Table, Button, Tag, Space, Popconfirm } from 'antd'
import logo from '../../components/Frame/logo.png'

const columns = [
    {
        title: '样品图',
        dataIndex: 'image',
        render: (text) => <img src={text} alt="" style={{ width: '100px', height: '50px' }} />,
        align: "center",
    },
    {
        title: '商品名',
        dataIndex: 'productName',
        render: (text) => <Button type='link'>{text}</Button>,
        align: "center",
    },
    {
        title: '价格',
        dataIndex: 'price',
        align: "center",
    },
    {
        title: '分类',
        dataIndex: 'category',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
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
        ),
        align: "center",
    },
    {
        title: '库存',
        dataIndex: 'productNumber',
        align: "center",
    },
    {
        title: '描述',
        dataIndex: 'description',
        align: "center",
    },
    {
        title: '操作',
        dataIndex: 'action',
        render: (text, record, index) => (
            <>
                <Space size="middle">
                    <Button>修改</Button>
                    <Popconfirm
                        title="确认删除此项？"
                        okText="确定"
                        onConfirm={() => { console.log("用户确认删除！") }}
                        cancelText="取消"
                        onCancel={() => { console.log("用户取消删除！") }}
                    >
                        <Button>删除</Button>
                    </Popconfirm>
                </Space>
            </>
        ),
        align: "center",
    },
];
const data = [
    {
        key: '1',
        image: logo,
        productName: 'A',
        price: 32,
        tags: ['nice', 'developer'],
        productNumber: 10,
        description: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        image: logo,
        productName: 'B',
        price: 42,
        tags: ['loser'],
        productNumber: 10,
        description: 'New York No. 1 Lake Park',
    },
    {
        key: '3',
        image: logo,
        productName: 'C',
        price: 42,
        tags: ['cool', 'teacher'],
        productNumber: 10,
        description: 'New York No. 1 Lake Park',
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

export default function ProductsManage() {
    const navigate = useNavigate();
    const addClick = () => {
        navigate('edit/new');
    }

    return (
        <Card
            title="商品管理列表"
            headStyle={{ fontWeight: 'bold' }}
            extra={
                <Button type="primary" onClick={addClick} style={{ marginTop: '1px' }}>
                    新增
                </Button>
            }
        >
            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </Card >
    )
}
