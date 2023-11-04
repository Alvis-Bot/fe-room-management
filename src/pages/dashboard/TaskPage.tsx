import {Avatar, Button, Card, Col, DatePicker, Row, Space, Tooltip} from "antd";
import {
    AntDesignOutlined,
    FileExcelOutlined,
    UserOutlined
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import Meta from "antd/es/card/Meta";


const TaskPage = () => {
    return (
        <>
            <div
                style={{
                    marginTop: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Space>
                    <DatePicker format={`DD/MM/YYYY`} placeholder={`Chọn ngày`}/>
                    <Button
                        type="dashed"
                        shape={`default`} icon={<FileExcelOutlined/>}></Button>
                </Space>
                <Space>
                    <Search placeholder="Tìm kiếm theo tên"
                        // onSearch={onSearch}
                            enterButton/>

                </Space>
            </div>

            <Card

                title="CÔNG VIỆC"
                headStyle={{
                    border: 'none'
                }}
                style={{width: "100%", marginTop: `20px`}}
            >
                <Row
                    gutter={[60, 60]}
                >
                    <Col span={6}>
                        <Card

                            cover={
                                <img
                                    height={200}
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                        >
                            <Meta
                                title='Dự án 1'
                                description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                            />
                            <Space
                                style={{
                                    marginTop: `30px`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    style={{
                                        textTransform: 'uppercase',
                                    }}
                                    type={`primary`}
                                    size={`large`}
                                >Xem dự án</Button>
                                <Avatar.Group

                                    maxCount={2}
                                    size="small"
                                    maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}
                                >
                                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"/>
                                    <Avatar style={{backgroundColor: '#f56a00'}}>K</Avatar>
                                    <Tooltip title="Ant User" placement="top">
                                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                                    </Tooltip>
                                    <Avatar style={{backgroundColor: '#1677ff'}} icon={<AntDesignOutlined/>}/>
                                </Avatar.Group>
                            </Space>
                        </Card>

                    </Col>
                    <Col span={6}>
                        <Card

                            cover={
                                <img
                                    height={200}
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                        >
                            <Meta
                                title='Dự án 1'
                                description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                            />
                            <Space
                                style={{
                                    marginTop: `30px`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    style={{
                                        textTransform: 'uppercase',
                                    }}
                                    type={`primary`}
                                    size={`large`}
                                >Xem dự án</Button>
                                <Avatar.Group

                                    maxCount={2}
                                    size="small"
                                    maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}
                                >
                                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"/>
                                    <Avatar style={{backgroundColor: '#f56a00'}}>K</Avatar>
                                    <Tooltip title="Ant User" placement="top">
                                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                                    </Tooltip>
                                    <Avatar style={{backgroundColor: '#1677ff'}} icon={<AntDesignOutlined/>}/>
                                </Avatar.Group>
                            </Space>
                        </Card>

                    </Col>
                    <Col span={6}>
                        <Card

                            cover={
                                <img
                                    height={200}
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                        >
                            <Meta
                                title='Dự án 1'
                                description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                            />
                            <Space
                                style={{
                                    marginTop: `30px`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    style={{
                                        textTransform: 'uppercase',
                                    }}
                                    type={`primary`}
                                    size={`large`}
                                >Xem dự án</Button>
                                <Avatar.Group

                                    maxCount={2}
                                    size="small"
                                    maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}
                                >
                                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"/>
                                    <Avatar style={{backgroundColor: '#f56a00'}}>K</Avatar>
                                    <Tooltip title="Ant User" placement="top">
                                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                                    </Tooltip>
                                    <Avatar style={{backgroundColor: '#1677ff'}} icon={<AntDesignOutlined/>}/>
                                </Avatar.Group>
                            </Space>
                        </Card>

                    </Col>
                    <Col span={6}>
                        <Card

                            cover={
                                <img
                                    height={200}
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                        >
                            <Meta
                                title='Dự án 1'
                                description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                            />
                            <Space
                                style={{
                                    marginTop: `30px`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    style={{
                                        textTransform: 'uppercase',
                                    }}
                                    type={`primary`}
                                    size={`large`}
                                >Xem dự án</Button>
                                <Avatar.Group

                                    maxCount={2}
                                    size="small"
                                    maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}
                                >
                                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"/>
                                    <Avatar style={{backgroundColor: '#f56a00'}}>K</Avatar>
                                    <Tooltip title="Ant User" placement="top">
                                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                                    </Tooltip>
                                    <Avatar style={{backgroundColor: '#1677ff'}} icon={<AntDesignOutlined/>}/>
                                </Avatar.Group>
                            </Space>
                        </Card>

                    </Col>
                    <Col span={6}>
                        <Card

                            cover={
                                <img
                                    height={200}
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                        >
                            <Meta
                                title='Dự án 1'
                                description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                            />
                            <Space
                                style={{
                                    marginTop: `30px`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    style={{
                                        textTransform: 'uppercase',
                                    }}
                                    type={`primary`}
                                    size={`large`}
                                >Xem dự án</Button>
                                <Avatar.Group

                                    maxCount={2}
                                    size="small"
                                    maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}
                                >
                                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"/>
                                    <Avatar style={{backgroundColor: '#f56a00'}}>K</Avatar>
                                    <Tooltip title="Ant User" placement="top">
                                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                                    </Tooltip>
                                    <Avatar style={{backgroundColor: '#1677ff'}} icon={<AntDesignOutlined/>}/>
                                </Avatar.Group>
                            </Space>
                        </Card>

                    </Col>
                    <Col span={6}>
                        <Card

                            cover={
                                <img
                                    height={200}
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                        >
                            <Meta
                                title='Dự án 1'
                                description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                            />
                            <Space
                                style={{
                                    marginTop: `30px`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    style={{
                                        textTransform: 'uppercase',
                                    }}
                                    type={`primary`}
                                    size={`large`}
                                >Xem dự án</Button>
                                <Avatar.Group

                                    maxCount={2}
                                    size="small"
                                    maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}
                                >
                                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"/>
                                    <Avatar style={{backgroundColor: '#f56a00'}}>K</Avatar>
                                    <Tooltip title="Ant User" placement="top">
                                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                                    </Tooltip>
                                    <Avatar style={{backgroundColor: '#1677ff'}} icon={<AntDesignOutlined/>}/>
                                </Avatar.Group>
                            </Space>
                        </Card>

                    </Col>
                </Row>
            </Card>

        </>
    )
}

export default TaskPage