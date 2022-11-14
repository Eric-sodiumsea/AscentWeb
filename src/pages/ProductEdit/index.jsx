import React, { useState, useEffect, useRef } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Card, Form, Upload, Modal, Input, Tooltip, Tag, Button } from 'antd';
import ImgCrop from 'antd-img-crop';
import logo from '../../components/Frame/logo.png'

const product = {
    key: '1',
    image: logo,
    productName: 'A',
    price: 32,
    productNumber: 10,
    tags: ['nice', 'developer'],
    description: 'New York No. 1 Lake Park',
}

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
            span: 21,
            offset: 3,
        },
    },
};

// 样品图
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function ProductEdit() {
    // 样品图
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const onCancel = () => setPreviewOpen(false);

    // 分类标签
    const [tags, setTags] = useState(product.tags);
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

    return (
        <Card title="商品编辑" bordered={false} hoverable={true} headStyle={{ textAlign: 'center', fontWeight: 'bold' }} >
            <Form
                {...formItemLayout}
                name="edit"
                initialValues={{
                    image: logo,
                    productName: product.productName,
                    price: product.price,
                    productNumber: product.productNumber,
                    description: product.description,
                }}
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
                    <ImgCrop rotate>
                        <Upload
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={onCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
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
                    name="category"
                    label="商品分类"
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
                                    closable={index !== 0}
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
                                <PlusOutlined /> New Tag
                            </Tag>
                        )}
                    </>
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
