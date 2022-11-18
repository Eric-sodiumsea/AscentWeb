import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Card, Form, Select, Input, Button, Row, Col } from 'antd';
import logo from '../../components/Frame/logo.png'
import './index.css'
import axios from '../../utils/axios';
const { Option } = Select;

export default function ProductsShow() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/product?methodName=findProductList')
            .then((res) => {
                setProducts(res.data.map((product) => {
                    return {
                        productId: product.id,
                        image: logo,
                        productName: product.productname,
                        description: product.description,
                        price: product.price,
                    }
                }))
            }).catch(error => {
                console.log(error);
            })
    }, []);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        if (values.options === "productName") {
            axios.get('/product?methodName=findProductByName&productname=' + values.search)
                .then(res => {
                    console.log(res);
                    setProducts(res.data.map((product) => {
                        return {
                            productId: product.id,
                            image: logo,
                            productName: product.productname,
                            description: product.description,
                            price: product.price,
                        }
                    }))
                }).catch(error => {
                    console.log(error);
                })
        } else if (values.options === "productCategory") {
            axios.get('/product?methodName=findProductByCategoryName&categoryname=' + values.search)
                .then(res => {
                    setProducts(res.data.map((product) => {
                        return {
                            productId: product.id,
                            image: logo,
                            productName: product.productname,
                            description: product.description,
                            price: product.price,
                        }
                    }))
                }).catch(error => {
                    console.log(error);
                })
        } else if (values.options === "all") {
            axios.get('/product?methodName=findProductList')
                .then(res => {
                    setProducts(res.data.map((product) => {
                        return {
                            productId: product.id,
                            image: logo,
                            productName: product.productname,
                            description: product.description,
                            price: product.price,
                        }
                    }))
                }).catch(error => {
                    console.log(error);
                })
        }
    };

    return (
        <Card
            title='商品浏览'
            headStyle={{ fontWeight: 'bold' }}
            extra={
                <Form
                    name='search'
                    layout='inline'
                    onFinish={onFinish}
                    initialValues={{ options: 'productName' }}
                >
                    <Form.Item name='options'>
                        <Select style={{ width: '150px' }}>
                            <Option value='productName'>按商品名查询</Option>
                            <Option value='productCategory'>按商品种类查询</Option>
                            <Option value='all'>查询所有</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name='search'>
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            查询
                        </Button>
                    </Form.Item>
                </Form>
            }
        >
            <Row gutter={[24, 24]}>
                {
                    products.map(product => {
                        return (
                            <Col key={product.productId} className="gutter-row product" span={6}>
                                <NavLink to={"detail/" + product.productId}>
                                    <Card title={product.productName} headStyle={{ fontWeight: 'bold' }} hoverable>
                                        <img src={logo} alt="样品图" />
                                        <p className='price'>{product.price}</p>
                                        <p className='description'>{product.description}</p>
                                    </Card>
                                </NavLink>
                            </Col>
                        )
                    })
                }
            </Row>
        </Card>
    )
}
