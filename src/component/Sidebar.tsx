import {Avatar, Menu, MenuProps, Row} from "antd";
import React, {FC} from "react";
import {DesktopOutlined, UserOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import logo from "../assets/images/logo.ico";
import {useLocation, useNavigate} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];
type SidebarProps = {
    collapsed: boolean,
    setCollapsed: (collapsed: boolean) => void
}

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    className?: string,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        className,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [

    getItem('Users Manager', 'users', <UserOutlined/>, 'menu-item-custom'),
    getItem('Rooms Manager', 'rooms', <DesktopOutlined/>, 'menu-item-custom'),
    // getItem('Option 2', '2', <DesktopOutlined />),
    // getItem('User', 'sub1', <UserOutlined />, [
    //     getItem('Tom', '3'),
    //     getItem('Bill', '4'),
    //     getItem('Alex', '5'),
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined />),
];


const Sidebar: FC<SidebarProps> = ({
                                       collapsed,
                                       setCollapsed,
                                   }) => {
    const navigate = useNavigate()

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        navigate(e.key as string)
    };

    const getDefaultSelectedKeys = (pathname: string) => {
        const pathParts = pathname.split('/');
        const firstPathSegment = pathParts[1];

        switch (firstPathSegment) {
            case 'users':
                return ['users'];
            case 'rooms':
                return ['rooms'];
            default:
                return [];
        }
    };

// Sử dụng hook useLocation để lấy pathname
    const {pathname} = useLocation();
    const defaultSelectedKeys = getDefaultSelectedKeys(pathname);

    return (
        <Sider
            collapsible collapsed={collapsed} onCollapse={setCollapsed}
        >
            <Row justify="center" style={{

                marginTop: '20px',
                marginBottom: '20px'
            }}>
                <Avatar
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    size={collapsed ? 50 : 100}
                    src={logo}
                    alt={'logo'}
                />
            </Row>

            <Menu
                onClick={handleMenuClick}
                style={{height: '100%'}}
                theme="dark"
                mode="inline"
                inlineCollapsed={collapsed}
                defaultSelectedKeys={defaultSelectedKeys}
                items={items}
            />
        </Sider>
    )

}

export default Sidebar