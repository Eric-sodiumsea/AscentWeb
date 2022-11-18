import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button, Radio, Tag, Tooltip, message } from 'antd';
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

export default function UserEditPower() {
    // 用户分配商品
    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTags(newTags);
    };
    const showInput = () => {
        setInputVisible(true);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };
    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setInputValue('');
    };

    // Form表单初始化值
    const [form] = Form.useForm();
    const [editTitle, setEditTitle] = useState("");
    const { userId } = useParams();
    useEffect(() => {
        // 判断是新增用户还是修改用户
        if (userId === "new") {
            // 新增用户
            setEditTitle("新增用户");
        } else {
            // 修改用户
            setEditTitle("编辑用户信息");
            axios.get('/user?methodName=findUserById&id=' + userId)
                .then((res) => {
                    form.setFieldsValue({
                        username: res.data.username,
                        password: res.data.password,
                        passwordAgain: res.data.password,
                        nickname: res.data.nickname,
                        tel: res.data.tel,
                        email: res.data.email,
                        address: res.data.address,
                        superuser: res.data.superuser === "3" ? "2" : res.data.superuser,
                    })
                    setTags(res.data.productList.map(product => {
                        return product.productname;
                    }))
                }).catch(error => {
                    console.log(error);
                })
        }
    }, []);

    const navigate = useNavigate();

    // 表单提交
    const onFinish = (values) => {
        console.log('Success:', values);
        if (userId === "new") {
            // 新增用户
            axios.post('/user', {
                "methodName": "addUser",
                "username": values.username,
                "password": values.password,
                "nickname": values.nickname,
                "tel": values.tel,
                "email": values.email,
                "address": values.address,
                "superuser": values.superuser,
                "products": tags,
                "delsoft": "0"
            }, {
                headers: { 'Content-Type': 'application/json;charset=utf-8' }
            }).then((res) => {
                if (res.data.msg === "fail") {
                    message.success("保存失败！该用户名已存在！");
                }
                else {
                    navigate('/admin/users');
                    message.success("保存成功！");
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            // 修改用户
            axios.post('/user', {
                "methodName": "updateUserByAdmin",
                "id": userId,
                "username": values.username,
                "password": values.password,
                "nickname": values.nickname,
                "tel": values.tel,
                "email": values.email,
                "address": values.address,
                "superuser": values.superuser,
                "products": tags,
                "delsoft": "0"
            }, {
                headers: { 'Content-Type': 'application/json;charset=utf-8' }
            }).then((res) => {
                if (res.data.msg === "fail") {
                    message.success("保存失败！该用户名已存在！");
                }
                else {
                    navigate('/admin/users');
                    message.success("保存成功！");
                }
            }).catch(error => {
                console.log(error);
            })
        }

    };
    const onFinishFailed = (errorInfo) => {
        message.error("保存失败！请输入完整信息！");
    };

    return (
        <Card title={editTitle} className='signup-form' headStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }} hoverable >
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

                <Form.Item
                    name="superuser"
                    label="用户权限"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户权限！',
                        }
                    ]}
                >
                    <Radio.Group name="radiogroup">
                        <Radio value="1">普通用户</Radio>
                        <Radio value="2">管理员</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="products"
                    label="管理商品"
                >
                    <>
                        {tags.map((tag, index) => {
                            if (editInputIndex === index) {
                                return (
                                    <Input
                                        ref={editInputRef}
                                        key={tag}
                                        size="small"
                                        className="tag-input"
                                        value={editInputValue}
                                        onChange={handleEditInputChange}
                                        onBlur={handleEditInputConfirm}
                                        onPressEnter={handleEditInputConfirm}
                                    />
                                );
                            }
                            const isLongTag = tag.length > 20;
                            const tagElem = (
                                <Tag
                                    className="edit-tag"
                                    key={tag}
                                    closable
                                    onClose={() => handleClose(tag)}
                                >
                                    <span
                                        onDoubleClick={(e) => {
                                            if (index !== 0) {
                                                setEditInputIndex(index);
                                                setEditInputValue(tag);
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                                    </span>
                                </Tag>
                            );
                            return isLongTag ? (
                                <Tooltip title={tag} key={tag}>
                                    {tagElem}
                                </Tooltip>
                            ) : (
                                tagElem
                            );
                        })}
                        {inputVisible && (
                            <Input
                                ref={inputRef}
                                type="text"
                                size="small"
                                className="tag-input"
                                value={inputValue}
                                onChange={handleInputChange}
                                onBlur={handleInputConfirm}
                                onPressEnter={handleInputConfirm}
                            />
                        )}
                        {!inputVisible && (
                            <Tag className="site-tag-plus" onClick={showInput}>
                                <PlusOutlined /> 新增管理商品
                            </Tag>
                        )}
                    </>
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
