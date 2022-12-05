/**
 * 商品详情
 */

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Image, Row, Col, Tag, InputNumber, Button } from 'antd';
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import logo from '../../components/Frame/logo.png'
import axios from '../../utils/axios';

export default function ProductItem() {
    const [product, setProduct] = useState({ tags: [] });
    const { productId } = useParams();
    useEffect(() => {
        axios.get('/product?methodName=findProductById&id=' + productId)
            .then((res) => {
                console.log("商品列表为：", res.data);
                setProduct({
                    key: productId,
                    image: logo,
                    productName: res.data.productname,
                    price: res.data.price,
                    stock: res.data.stock,
                    tags: res.data.categoryList.map(category => {
                        return category.categoryname;
                    }),
                    description: res.data.description,
                });
            }).catch(error => {
                console.log(error);
            })
    }, []);

    const navigate = useNavigate();

    return (
        <Card
            title="商品详情"
            bordered={false}
            hoverable={true}
            headStyle={{ textAlign: 'center', fontWeight: 'bold' }}
        >
            <Row gutter={[36]}>
                <Col span={10}>
                    <Image src={logo} />
                    图片功能未实现！
                </Col>
                <Col span={14}>
                    <Row gutter={[24, 16]}>
                        <Col span={4}>商品名：</Col>
                        <Col span={20} style={{ fontWeight: 'bold' }}>{product.productName}</Col>
                        <Col span={4}>商品价格：</Col>
                        <Col span={20}>{product.price}</Col>
                        <Col span={4}>商品分类：</Col>
                        <Col span={20}>
                            {
                                product.tags.map(tag => {
                                    return (
                                        <Tag key={tag}>{tag}</Tag>
                                    )
                                })
                            }
                        </Col>
                        <Col span={4}>详细描述：</Col>
                        <Col span={20}><span style={{
                            'wordWrap': 'break-word',
                            'wordBreak': 'break-all',
                            'overflow': 'hidden'
                        }}>{product.description}</span></Col>
                        <Col span={4}>数量：</Col>
                        <Col span={20}><InputNumber min={1} max={product.stock} defaultValue={1} /></Col>
                        <Col span={4}>仅剩：</Col>
                        <Col span={20}>{product.stock}</Col>
                        <Col span={4}><Button icon={<ShoppingCartOutlined />} onClick={() => navigate('/user/cart')}>加入购物车</Button></Col>
                        <Col span={4} offset={1}><Button type='primary' icon={<ShoppingOutlined />} onClick={() => navigate('/user/orders')}>立即购买</Button></Col>
                        <Col span={15}></Col>
                    </Row>
                </Col>
            </Row >
        </Card >
    )
}
