import {Breadcrumb, Drawer, Layout, theme} from "antd";
import AntMenu from "../../component/AntdMenu.tsx";
import {Content} from "antd/es/layout/layout.js";
import {Outlet, useLocation} from "react-router-dom";
import Header from "../../component/Header.tsx";
import {useEffect, useState} from "react";
import Sider from "antd/es/layout/Sider";
import {useMediaQuery} from "usehooks-ts";


const DashboardLayout = () => {

    const {pathname} = useLocation();

    const isMobileScreen = useMediaQuery('(max-width: 768px)');

    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout className={`layout-dashboard`}>

            <Drawer
                style={{
                    overflow: 'auto',
                }}

                title={false}

                placement="left"
                closable={false}
                onClose={() => setCollapsed(false)}
                width={250}
                open={collapsed}
                className={`drawer-sidebar`}
            >
                <Layout>
                    <Sider
                        // mode like theme
                        theme={'dark'}
                        trigger={null}
                        width={250}
                    >
                        <AntMenu/>
                    </Sider>

                </Layout>
            </Drawer>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                }}
                breakpoint="lg"
                collapsedWidth={0}
                trigger={null}
                width={250}
                theme={'dark'}
            >
                <AntMenu/>
            </Sider>
            <Layout
                className={`layout-dashboard`}
                style={{
                    marginLeft: isMobileScreen ? 0 : 250,
                }}
            >
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    isMobile={isMobileScreen}
                    name={pathname}
                />
                <Content style={{margin: '0 16px'}}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}

export default DashboardLayout