import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Dropdown, Space, Avatar } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { adminRoutes, userRoutes } from '../../routes'
import { useNavigate } from 'react-router-dom'
import logo from './logo.png'
import './index.css'
import { removeToken, isLogined } from '../../utils/auth'

const items = [
    {
        label: (<a href="/">修改账号信息</a>),
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
    const { Header, Content, Sider } = Layout;
    let routes;
    if (props.url === "admin") {
        routes = adminRoutes;
    } else {
        routes = userRoutes
    }
    const isShowRoutes = routes.filter(route => route.isShow);
    const SidebarItems = isShowRoutes.map(route => {
        return {
            key: route.path,
            icon: route.icon,
            label: route.name,
        }
    })

    let navigate = new useNavigate();

    // 判断是否登录，若还没登录，则重定向回登录页
    useEffect(() => {
        if (!isLogined()) {
            navigate('/signin');
        }
    }, [])

    return (
        <Layout>
            <Header className="header" style={{ backgroundColor: "rgb(70, 123, 167)" }}>
                <div className="logo">
                    <img src={logo} alt="" style={{ height: "64px" }} />
                </div>
                <Dropdown
                    menu={{ items }}
                >
                    <NavLink to={"/admin/users/edit/" + isLogined()}>
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