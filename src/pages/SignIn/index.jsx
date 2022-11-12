import React from 'react'
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Button, Checkbox, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom'
import { setToken } from '../../utils/auth'
import './index.css'

export default function SignIn() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setToken({ 'username': values.username, 'password': values.password });
        navigate('/admin');
    };

    return (
        <Card title="登 录" className='signin-form' headStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>
            {/* <button>
                <NavLink to="/admin/products">管理员登录</NavLink>
            </button>
            <br />
            <button>
                <NavLink to="/user/products">普通用户登录</NavLink>
            </button>
            <br />
            <NavLink to="/signup">去注册</NavLink> */}

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
