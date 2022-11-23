/**
 * 个人账户编辑
 */

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Form, Input, Button, message } from 'antd';
import './index.css'
import axios from '../../utils/axios';
import { getToken } from '../../utils/auth'

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

export default function UserEdit() {
    // Form表单初始化值
    const [form] = Form.useForm();
    const { userId } = useParams();
    useEffect(() => {
        axios.get('/user?methodName=findUserById&id=' + getToken())
            .then((res) => {
                form.setFieldsValue({
                    username: res.data.username,
                    password: res.data.password,
                    passwordAgain: res.data.password,
                    nickname: res.data.nickname,
                    tel: res.data.tel,
                    email: res.data.email,
                    address: res.data.address,
                })
            }).catch(error => {
                console.log("查询失败！");
            })
    }, []);

    console.log("form: ", form)

    // 表单提交
    const onFinish = (values) => {
        console.log('Success:', values);
        // 修改用户
        axios.post('/user', {
            "methodName": "updateUser",
            "id": userId,
            "username": values.username,
            "password": values.password,
            "nickname": values.nickname,
            "tel": values.tel,
            "email": values.email,
            "address": values.address,
        }, {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).then((res) => {
            if (res.data.msg === "fail") {
                message.success("保存失败！该用户名已存在！");
            }
            else {
                message.success("保存成功！");
            }
        }).catch(error => {
            console.log(error);
        })
    };
    const onFinishFailed = (errorInfo) => {
        message.error("保存失败！请输入完整信息！");
    };

    return (
        <Card title="个人账号编辑" className='signup-form' headStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }} hoverable >
            <Form
                form={form}
                {...formItemLayout}
                name="edit"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                    name="passwordAgain"
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
                    name="nickname"
                    label="昵称"
                    rules={[
                        {
                            required: true,
                            message: '请输入昵称！',
                        },
                    ]}
                >
                    <Input />
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

                <Form.Item {...tailFormItemLayout} style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" style={{ width: '40%', height: '40px' }}>
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </ Card>
    )
}
