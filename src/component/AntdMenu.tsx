import {Menu, MenuProps} from "antd";
import React from "react";
import {DashboardOutlined, UserOutlined, VideoCameraAddOutlined} from "@ant-design/icons";
import logo from "../assets/images/logo.ico";
import {useLocation, useNavigate} from "react-router-dom";


type MenuItem = Required<MenuProps>['items'][number] & {
    icon?: React.ReactNode;
    label: string;
    page: string;
    className?: string;
    children?: MenuItem[];
};

function getItem(
    key: React.Key,
    label: React.ReactNode,
    page: string,
    icon?: React.ReactNode,
    className?: string,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        page,
        label,
        className,
        children,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('users', 'Người dùng', 'users', <UserOutlined/>, 'menu-item-custom'),
    getItem('rooms', 'Phòng', 'rooms', <DashboardOutlined/>, 'menu-item-custom'),
    getItem('subManager', 'Quản lý', 'subManager', <VideoCameraAddOutlined />, 'menu-item-custom-papa',[
        getItem('events', 'Sự kiện', 'events', <VideoCameraAddOutlined />, 'menu-item-custom'),
        getItem('attendance', 'Điểm danh', 'attendance', <VideoCameraAddOutlined />, 'menu-item-custom'),
        getItem('tasks', 'Công việc', 'tasks', <VideoCameraAddOutlined />, 'menu-item-custom'),

    ]),
];


const AntMenu = () => {
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
            case 'events':
                return ['events'];
            case 'attendance':
                return ['attendance'];
            case 'tasks':
                return ['tasks'];
            default:
                return [];
        }
    };

    const getDefaultOpenKeys = (pathname: string) => {
        const pathParts = pathname.split('/');
        const firstPathSegment = pathParts[1];

        switch (firstPathSegment) {
            case 'events':
                return ['subManager'];
            case 'attendance':
                return ['subManager'];
            case 'tasks':
                return ['subManager'];
            default:
                return [];
        }
    }

// Sử dụng hook useLocation để lấy pathname
    const {pathname} = useLocation();

   const defaultSelectedKeys = getDefaultSelectedKeys(pathname);
    const defaultOpenKeys = getDefaultOpenKeys(pathname);

    return (
        <>
            <div className="brand" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 0',
            }}>
                <img
                    style={{
                        height: '50px',
                    }}
                    src={logo} alt="logo"/>
                <span
                    style={{
                        color: '#fff',
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}
                >Alvis Dashboard</span>
            </div>

            <Menu
                forceSubMenuRender={true}
                defaultSelectedKeys={defaultSelectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                onClick={handleMenuClick}
                items={items}
                theme={'dark'}
                mode="inline"
            />
        </>
    )

}









export default AntMenu