import React from 'react'
import { Card, Form, Input, Button, Radio } from 'antd';
import './index.css'

// 表单元素布局
const formItemLayout = {
    // 表单布局
    labelCol: {
        // 屏幕< 576px 响应式栅格
        xs: {
            span: 24,
        },
        // 屏幕 ≥ 576px
        sm: {
            span: 4,
        },
    },
    // 输入控件布局
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};

// 表单提交元素布局
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 24,
            offset: 0,
        },
    },
};

export default function UserEditPower() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card title="用户账号编辑" className='signup-form' headStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }} hoverable >
            <Form
                {...formItemLayout}
                name="edit"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ username: 'xnh', password: '123', tel: '123456', email: '123@qq.com', address: 'abc', power: 2, products: 'abc 666 999' }}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="password-again"
                    label="确认密码"
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码！',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject("两次输入的密码不一致!")
                            }
                        })
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="tel"
                    label="手机号"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱地址"
                    rules={[
                        {
                            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                            message: '请输入正确的邮箱地址！',
                        },
                        {
                            required: true,
                            message: '请输入邮箱地址！',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="收货地址"
                    rules={[
                        {
                            required: true,
                            message: '请输入收货地址！',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="power"
                    label="用户权限"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户权限！',
                        }
                    ]}
                >
                    <Radio.Group name="radiogroup">
                        <Radio value={1}>普通用户</Radio>
                        <Radio value={2}>管理员</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="products"
                    label="管理商品"
                    extra="输入商品名，若有多个则用一个空格隔开"
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailFormItemLayout} style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" style={{ width: '40%', height: '40px' }}>
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </ Card>
    )
}
