/**
 * 邮件管理
 */

import React from 'react'
import { Form, Card, Input, Button, message } from 'antd'
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
            span: 8,
        },
    },
    // 输入控件布局
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 10,
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
            span: 16,
            offset: 8,
        },
    },
};

// Form表单初始化值
let data = {};
axios.get('/mail?methodName=findMail')
    .then(res => {
        data.emailAddress = res.data.fromaddress;
        data.emailPassword = res.data.frompassword;
        data.receiptEmail = res.data.toaddress;
    }).catch(err => {
        console.log(err);
    });

export default function Email() {
    // 表单提交
    const onFinish = (values) => {
        // 保存邮件
        axios.post('/mail', {
            "methodName": "saveMail",
            "fromaddress": values.emailAddress,
            "frompassword": values.emailPassword,
            "toaddress": values.receiptEmail
        }, {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).then((res) => {
            if (res.data.msg === "fail") {
                message.success("保存失败！");
            } else {
                message.success("保存成功！");
                // 刷新页面
                window.location.reload();
            }
        }).catch(error => {
            message.success("保存失败！");
        })
    };
    const onFinishFailed = (errorInfo) => {
        message.warn("请输入完整信息！")
    };

    return (
        <Card title="管理员邮件设置" bordered={false} hoverable={true} headStyle={{ textAlign: 'center', fontWeight: 'bold' }} >
            <Form
                {...formItemLayout}
                name="edit"
                initialValues={data}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="emailAddress"
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
                    name="emailPassword"
                    label="邮箱密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入邮箱密码！',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="receiptEmail"
                    label="收件邮箱"
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

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
