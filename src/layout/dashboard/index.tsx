import {Breadcrumb, Layout, theme} from "antd";
import Sidebar from "../../component/Sidebar.tsx";
import {Header} from "antd/es/layout/layout";
import {Content} from "antd/es/layout/layout.js";
import {Outlet, useLocation} from "react-router-dom";
import HeaderLayout from "../../component/HeaderLayout.tsx";
import {useState} from "react";


const DashboardLayout = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);

    const { pathname } = useLocation();
    const getDefaultSelectedKeys = (pathname: string) => {
        const pathParts = pathname.split('/');
        const firstPathSegment = pathParts[1];

        switch (firstPathSegment) {
            case 'users':
                return 'Users';
            case 'rooms':
                return 'Rooms';
            default:
                return '';
        }
    }
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <Layout>
                <HeaderLayout
                    colorBgContainer={colorBgContainer}
                    setCollapsed={setCollapsed}
                    collapsed={collapsed}
                />
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>{
                            getDefaultSelectedKeys(pathname)
                        }</Breadcrumb.Item>
                    </Breadcrumb>
                    <Outlet/>
                </Content>
                {/*<Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>*/}
            </Layout>
        </Layout>
    )
}

export default DashboardLayout