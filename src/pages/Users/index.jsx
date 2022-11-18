import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { Card, Table, Button, Tag, Space, Popconfirm, message } from 'antd'
import axios from '../../utils/axios';

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

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/user?methodName=findUserList')
            .then((res) => {
                console.log("查询成功！");
                console.log(res.data);
                setData(res.data.map((user) => {
                    return {
                        key: user.id,
                        username: user.username,
                        nickname: user.nickname,
                        tel: user.tel,
                        email: user.email,
                        address: user.address,
                        power: user.superuser === "1" ? "普通用户" : "管理员",
                        products: (
                            user.productList.map(product => {
                                return product.productname
                            }))
                    }
                }))
            }).catch(error => {
                console.log("查询失败！");
            })
    }, []);

    // 新增用户按钮
    const addClick = () => {
        navigate('editpower/new');
    }

    // 修改用户按钮
    const editClick = (userId) => {
        navigate('editpower/' + userId)
    }

    const deleteUser = (userId) => {
        axios.get('/user?methodName=deleteUser&id=' + userId)
            .then((res) => {
                if (res.data.msg === "fail") {
                    message.error("删除失败！")
                }
                else {
                    window.location.reload();
                    message.success("删除成功！")
                }
            }).catch(error => {
                console.log(error);
            })
    }

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            render: (text, record, index) => <Button type='link'><NavLink to={'/admin/users/editpower/' + record.key}>{text}</NavLink></Button>,
            align: 'center',
            width: '90px',
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            render: (text, record, index) => <Button type='link'><NavLink to={'/admin/users/editpower/' + record.key}>{text}</NavLink></Button>,
            align: 'center',
            width: '90px',
        },
        {
            title: '手机号',
            dataIndex: 'tel',
            align: 'center',
            width: '90px',
        },
        {
            title: '邮箱地址',
            dataIndex: 'address',
            align: 'center',
            width: '90px',
        },
        {
            title: '收货地址',
            dataIndex: 'address',
            align: 'center',
            width: '90px',
        },
        {
            title: '用户权限',
            dataIndex: 'power',
            render: (text, record, index) => <Button type='link'>{text}</Button>,
            align: 'center',
            width: '90px',
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
                        <Button onClick={() => editClick(record.key)}>修改</Button>
                        <Popconfirm
                            title='确认删除此项？'
                            okText='确定'
                            onConfirm={() => { deleteUser(record.key) }}
                            cancelText='取消'
                            onCancel={() => { message.success("已取消删除！") }}
                        >
                            <Button>删除</Button>
                        </Popconfirm>
                    </Space>
                </>
            ),
            align: 'center',
        },
    ];

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
