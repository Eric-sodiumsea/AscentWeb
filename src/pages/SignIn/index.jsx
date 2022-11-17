/**
 * 登录
 */

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Button, Checkbox, Form, Input, message } from 'antd';
import { NavLink } from 'react-router-dom'
import { getToken, setToken } from '../../utils/auth'
import './index.css'
import axios from '../../utils/axios';

export default function SignIn() {
    const navigate = useNavigate();

    useEffect(() => {
        if (getToken()) {
            axios.get('/user?methodName=findSuperuserByUserId&id=' + getToken())
                .then(res => {
                    console.log(res)
                    if (res.data.superuser === "admin") {
                        navigate('/admin');
                    } else if (res.data.superuser === "user") {
                        navigate('/user');
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }, []);

    const onFinish = (values) => {
        axios.post('/usrlogin', {
            "methodName": "login",
            'username': values.username,
            'password': values.password,
        }, {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).then((res) => {
            console.log(res);
            setToken(res.data.userId);
            if (res.data.superuser === "admin") {
                navigate('/admin');
            } else if (res.data.superuser === "user") {
                navigate('/user');
            } else {
                message.error('用户名或密码错误！');
            }
        }).catch(error => {
            console.log(error);
        })
    };

    return (
        <Card title="登 录" className='signin-form' headStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }} hoverable>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "请输入用户名！",
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        登录
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button style={{ width: '100%' }}>
                        <NavLink to="/signup">去注册</NavLink>
                    </Button>
                </Form.Item>
            </ Form>
        </Card>
    )
}
