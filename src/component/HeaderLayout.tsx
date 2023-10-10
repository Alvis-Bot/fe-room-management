import {Header} from "antd/es/layout/layout";
import {Avatar, Button, Dropdown} from "antd";
import {LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";
import {FC} from "react";

type HeaderLayoutProps = {
    colorBgContainer: string,
    collapsed: boolean,
    setCollapsed: (collapsed: boolean) => void
}


const items = [
    {
        label: 'Thông tin cá nhân',
        key: '1',
        icon: <UserOutlined/>,
        className: 'custom-dropdown-item',
    },
    {
        label: 'Đăng xuất',
        key: '2',
        icon: <LogoutOutlined/>,
        className: 'custom-dropdown-item',
    },
];

const HeaderLayout : FC<HeaderLayoutProps> = ({colorBgContainer, collapsed, setCollapsed}) => {


    const handleDropdownItemClick = (e: any) => {
        console.log(e);
    }

    return (
        <Header style={{padding: 0, background: colorBgContainer}}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: 20,
                }}
            >
                <Button
                    type="text"
                    className={`toggle-btn`}
                    icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        borderRadius: 0,
                    }}
                />

                <Dropdown

                    menu={{
                        items,
                        onClick: handleDropdownItemClick,
                    }}
                    trigger={["click"]}
                    placement="bottomLeft"
                >
                    <div
                        onClick={(e) => e.preventDefault()}
                    >
                        <Avatar
                            style={{
                                cursor: 'pointer',
                            }}
                            size="large"
                            src={'https://i.pinimg.com/originals/0f/6a/0a/0f6a0a1a1a4b6b0b6b0b6b0b6b0b6b0b.jpg'}
                            alt={'avatar'}
                            className="avatar"
                        />
                    </div>
                </Dropdown>
            </div>
        </Header>
    )
}

export default HeaderLayout