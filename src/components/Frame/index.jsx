import React from 'react'
import { Layout, Menu } from 'antd'
import routes from '../../routes'
import { useNavigate } from 'react-router-dom'
import logo from './logo.png'
import './index.css'

const { Header, Content, Sider } = Layout;

const isShowRoutes = routes.filter(route => route.isShow);
const SidebarItems = isShowRoutes.map(route => {
    return {
        key: route.path,
        icon: route.icon,
        label: route.name,
    }
})

export default function Frame(props) {
    const navigate = new useNavigate();
    return (
        <Layout>
            <Header className="header" style={{ backgroundColor: "rgb(70, 123, 167)" }}>
                <div className="logo">
                    <img src={logo} alt="" style={{ height: "64px" }} />
                </div>
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