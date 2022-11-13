import React, { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Form, Upload, Input, Button } from 'antd';
import logo from '../../components/Frame/logo.png'

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
            span: 3,
        },
    },
    // 输入控件布局
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 21,
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

// 获取样品图片
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export default function ProductEdit() {
    // 样品图
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
        } else if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传图片
            </div>
        </div>
    );

    return (
        <Card title="商品编辑" bordered={false} hoverable={true} headStyle={{ textAlign: 'center', fontWeight: 'bold' }} >
            <Form
                {...formItemLayout}
                name="edit"
            >
                <Form.Item
                    name="image"
                    label="样品图"
                    rules={[
                        {
                            required: true,
                            message: '请上传样品图！',
                        },
                    ]}
                    valuePropName="file"
                >
                    <Upload
                        // name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        action=""
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={logo}
                                alt="样品图"
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="productName"
                    label="商品名"
                    rules={[
                        {
                            required: true,
                            message: '请输入商品名！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="productNumber"
                    label="商品库存量"
                    rules={[
                        {
                            required: true,
                            message: '请输入商品库存量！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="商品价格"
                    rules={[
                        {
                            required: true,
                            message: '请输入商品价格！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="商品分类"
                    extra="使用空格分割"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="商品描述"
                >
                    <Input.TextArea />
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
