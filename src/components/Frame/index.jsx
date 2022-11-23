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

export default function Frame(props) {
    const { Header, Content, Sider } = Layout;

    let navigate = new useNavigate();

    // 侧边栏
    let routes;
    if (props.url === "admin") {
        routes = adminRoutes;
    } else {
        routes = userRoutes;
    }
    const isShowRoutes = routes.filter(route => route.isShow);
    const SidebarItems = isShowRoutes.map(route => {
        return {
            key: route.path,
            icon: route.icon,
            label: route.name,
        }
    })

    // 判断当前账户是管理员还是普通用户
    const [superuser, setSuperuser] = useState("");
    // 记录用户名
    const [username, setUsername] = useState("");
    useEffect(() => {
        // 判断是否登录，若还没登录，则重定向回登录页
        if (!isLogined()) {
            navigate('/signin');
        } else {
            // 若已经登录，则判断该用户是管理员还是普通用户
            axios.get('/user?methodName=findUserById&id=' + getToken())
                .then(res => {
                    setUsername(res.data.username);
                    if (res.data.superuser === "2" || res.data.superuser === "3") {
                        // 该用户为管理员，在前台页面时有权访问后台页面
                        if (props.url === "user") {
                            routes[6].isShow = true;
                        }
                        setSuperuser("admin");
                    } else if (res.data.superuser === "1") {
                        // 该用户为普通用户，无权访问后台页面，需跳转回前台页面
                        if (props.url === "admin") {
                            navigate('/user/products');
                        }
                        setSuperuser("user");
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }, []);


    const items = [
        {
            label: (<NavLink to={superuser === "admin" ? "/admin/users/editpower/" + getToken() : "/user/edit"} >修改账号信息</NavLink>),
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

    return (
        <Layout>
            <Header className="header" style={{ backgroundColor: "rgb(70, 123, 167)" }}>
                <div className="logo">
                    <img src={logo} alt="" style={{ height: "64px" }} />
                </div>
                <Dropdown
                    menu={{ items }}
                >
                    <NavLink to={superuser === "admin" ? "/admin/users/editpower/" + getToken() : "/user/edit"}>
                        <Space>
                            <Avatar>A</Avatar>
                            <span style={{ color: 'white' }}>{username}</span>
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