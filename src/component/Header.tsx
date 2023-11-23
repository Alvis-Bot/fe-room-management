import {Avatar, Breadcrumb, Col, Dropdown, MenuProps, message, Row, Space} from "antd";
import {
    LogoutOutlined,
    UserOutlined
} from "@ant-design/icons";
import  {FC, useEffect} from "react";
import {Header as AntHeader} from "antd/es/layout/layout";
import {useNavigate} from "react-router-dom";

type HeaderProps = {
    collapsed: boolean,
    setCollapsed: (collapsed: boolean) => void,
    name: string,
    isMobile: boolean,
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



const Header: FC<HeaderProps> = ({name }) => {

    const navigate = useNavigate()
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case '1':
                message.info('Thông tin cá nhân');
                break;
            case '2':
                localStorage.removeItem('accessToken')
                localStorage.setItem('isLogin', 'false')
                navigate('/auth/login')
                break;
            default:
                break;
        }
    };

    return (
        <AntHeader style={{

            height : 'auto',
            marginBottom: '20px',
            marginTop: '20px',
            backgroundColor: 'transparent',
            zIndex: 1,
        }}>
            <Row gutter={[24, 0]}>
                <Col md={12} span={24}>
                    <Breadcrumb

                      items={[{ title : 'Page'} , {title : name.replace("/", "")}]}
                    />
                    <div className="ant-page-header-heading" style={{
                        marginTop: "10px"
                    }}>
                        <span
                            className="ant-page-header-heading-title"
                            style={{
                                textTransform: "capitalize",
                            }}
                        >
                          {name.replace("/", "")}
                        </span>
                    </div>
                </Col>
                <Col md={12} span={24}>
                    <Space

                        direction="vertical" align={`end`} style={{

                            width: '100%'}}>
                        <Space  align={'center'} style={{width: '100%'}}>
                            <Dropdown
                                menu={{
                                    items,
                                    onClick: handleMenuClick,
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
                                        className="avatar"
                                    />
                                </div>
                            </Dropdown>
                        </Space>
                    </Space>
                </Col>
            </Row>
        </AntHeader>
    )
}

export default Header