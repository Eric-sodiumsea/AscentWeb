import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Dropdown, Space, Avatar } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { adminRoutes, userRoutes } from '../../routes'
import { useNavigate } from 'react-router-dom'
import logo from './logo.png'
import './index.css'
import { getToken, removeToken, isLogined } from '../../utils/auth'
import axios from '../../utils/axios';

const items = [
    {
        label: (<NavLink to={"/admin/users/edit/" + getToken()} >修改账号信息</NavLink>),
        key: '0',
    },
    {
        type: 'divider',
    },
    {
        label: (
            <NavLink to="/signin" onClick={removeToken}>退出登录</NavLink>
        ),
        key: '1',
    },
];

export default function Frame(props) {

    let navigate = new useNavigate();

    const [routes, setRoutes] = useState({});
    const [superuser, setSuperuser] = useState("");
    const [SidebarItems, setSidebarItems] = useState([]);

    useEffect(() => {
        // 判断是否登录，若还没登录，则重定向回登录页
        if (!isLogined()) {
            navigate('/signin');
        } else {
            // 若已经登录，则判断该用户是管理员还是普通用户
            axios.get('/user?methodName=findUserById&id=' + getToken())
                .then(res => {
                    console.log("findUserById  ", res);
                    if (res.data.superuser === "2" || res.data.superuser === "3") {
                        setRoutes(adminRoutes);
                        const isShowRoutes = adminRoutes.filter(route => route.isShow);
                        setSidebarItems(isShowRoutes.map(route => {
                            return {
                                key: route.path,
                                icon: route.icon,
                                label: route.name,
                            }
                        }))
                        setSuperuser("admin");
                    } else if (res.data.superuser === "1") {
                        setRoutes(userRoutes);
                        const isShowRoutes = userRoutes.filter(route => route.isShow);
                        setSidebarItems(isShowRoutes.map(route => {
                            return {
                                key: route.path,
                                icon: route.icon,
                                label: route.name,
                            }
                        }))
                        setSuperuser("user");
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }, []);

    const { Header, Content, Sider } = Layout;

    return (
        <Layout>
            <Header className="header" style={{ backgroundColor: "rgb(70, 123, 167)" }}>
                <div className="logo">
                    <img src={logo} alt="" style={{ height: "64px" }} />
                </div>
                <Dropdown
                    menu={{ items }}
                >
                    <NavLink to={superuser === "admin" ? "/admin/users/edit/" + getToken() : "/users/edit"}>
                        <Space>
                            <Avatar>A</Avatar>
                            <span style={{ color: 'white' }}>用户名</span>
                            <DownOutlined style={{ color: 'white' }} />
                        </Space>
                    </NavLink>
                </Dropdown>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={SidebarItems}
                        onClick={(event) => navigate(event.key)}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '16px',
                    }}
                >
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout >
    )
}