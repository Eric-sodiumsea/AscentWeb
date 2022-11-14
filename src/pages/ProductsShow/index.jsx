import React from 'react'
import { NavLink } from 'react-router-dom';
import { Card, Form, Select, Input, Button, Row, Col } from 'antd';
import logo from '../../components/Frame/logo.png'
import './index.css'
const { Option } = Select;

const products = [
    {
        productId: 1,
        image: logo,
        productName: "a",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        price: 33456.15
    },
    {
        productId: 2,
        image: logo,
        productName: "b",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        price: 456.15
    },
    {
        productId: 3,
        image: logo,
        productName: "c",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        price: 123.15
    },
    {
        productId: 4,
        image: logo,
        productName: "d",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        price: 789.50
    },
    {
        productId: 5,
        image: logo,
        productName: "e",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        price: 789.50
    },
    {
        productId: 6,
        image: logo,
        productName: "f",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        price: 789.50
    },
    {
        productId: 7,
        image: logo,
        productName: "g",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        price: 789.50
    },
    {
        productId: 8,
        image: logo,
        productName: "h",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        price: 789.50
    },
    {
        productId: 9,
        image: logo,
        productName: "i",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        price: 789.50
    },
    {
        productId: 10,
        image: logo,
        productName: "j",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        price: 789.50
    },
]

export default function ProductsShow() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
