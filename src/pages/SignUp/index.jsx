/**
 * 注册
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Card, Form, Input, Button, message } from 'antd';
import './index.css'
import axios from '../../utils/axios';

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

export default function SignUp() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post('/usrlogin', {
            "methodName": "register",
            "username": values.username,
            "password": values.password,
            "nickname": values.nickname,
            "tel": values.tel,
            "email": values.email,
            "address": values.address
        }, {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).then((res) => {
            console.log(res);
            if (res.data.msg === "fail") {
                message.error("注册失败！该用户名已被注册！")
                console.log("注册失败！该用户名已被注册！");
            } else if (res.data.msg === "success") {
                message.success("注册成功！");
                navigate('/signin');
            }
        }).catch(error => {
            console.log("注册失败！");
            message.success("注册失败！");
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card title="注 册" className='signup-form' headStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }} hoverable >
            <Form
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
                        立即注册
                    </Button>
                </Form.Item>

                <Form.Item {...tailFormItemLayout} style={{ textAlign: 'center' }}>
                    <Button style={{ width: '40%', height: '40px' }}>
                        <NavLink to="/signin">已有账号，去登录</NavLink>
                    </Button>
                </Form.Item>
            </Form>
        </ Card>
    )
}
