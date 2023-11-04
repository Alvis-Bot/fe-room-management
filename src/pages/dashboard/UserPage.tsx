import {
    Card,
    Col,
    Row,
    Table,
    Avatar, Button, Tag, Space, Popover, Popconfirm, Pagination, Select
} from "antd";
import {ColumnsType} from "antd/es/table";
import Title from "antd/es/typography/Title";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {useEffect, useState} from "react";
import {
    deleteUserAsyncThunk,
    getUsersAsyncThunk,
    lockUserAsyncThunk,
    updateRoleAsyncThunk
} from "../../redux/slices/users.ts";
import {AuditData, ERole, UserData} from "../../type.ts";
import {DeleteOutlined, EyeOutlined, LockOutlined, QuestionCircleOutlined, UnlockOutlined} from "@ant-design/icons";
import UserDetailModal from "../../component/modal/UserDetailModal.tsx";
import UserCreateModal from "../../component/modal/UserCreateModal.tsx";


const Users = () => {

    // table code start
    const columns: ColumnsType<UserData> = [
        {
            title : 'ID',
            dataIndex : 'studentCode',
            key : 'studentCode',
        },
        {
            title: "HỌ VÀ TÊN",
            dataIndex: "name",
            key: "name",

            render: (_text: string, record) => (
                <Avatar.Group>
                    <Avatar
                        className="shape-avatar"
                        shape="square"
                        size={40}
                        src={`https://i.pravatar.cc/150?img=${record.id}`}
                    ></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>{record.fullName}</Title>
                        <p>{record.email}</p>
                    </div>
                </Avatar.Group>
            )
        },
        {
            title: "TÊN ĐĂNG NHẬP",
            dataIndex: "username",
            key: 'username',
            render: (username: string) => (
                <p>{username}</p>
            ),
        },
        {
            title: "LOẠI TÀI KHOẢN",
            dataIndex: "roles",
            key: 'roles',
            render: (role: ERole , record) => {
                return (

                <Select
                    defaultValue={role}
                    style={{width: 140}}
                    onChange={(value) => handleOnChangeRole(value , record) }
                >
                    <Select.Option value={ERole.ADMIN}>Quản trị viên</Select.Option>
                    <Select.Option value={ERole.MANAGER}>Quản lý</Select.Option>
                    <Select.Option value={ERole.INTERN}>Thực tập sinh</Select.Option>
                    <Select.Option value={ERole.USER}>Người dùng</Select.Option>
                </Select>

                )
            }

        },
        {
            title: 'TRẠNG THÁI',
            dataIndex: 'isLocked',
            render: (isLocked) => {
                return (
                    <>
                        {
                            isLocked ?
                                <Tag color="red">Đã khoá</Tag>
                                :
                                <Tag color="green">Đang hoạt động</Tag>
                        }
                    </>
                )
            },
        },
        {
            title: 'HÀNH ĐỘNG',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    {
                        !record?.isLocked ?
                            <Popover content={`Khoá`} trigger="hover">
                                <Button
                                    onClick={() => {
                                        handleLock(record)
                                    }}
                                    size={`large`}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        padding: '0px 20px',
                                    }}>
                                    <LockOutlined style={{
                                        fontSize: '18px',
                                        cursor: 'pointer',
                                        //đỏ
                                        color: '#f5222d',
                                    }}/>
                                </Button>
                            </Popover>
                            :
                            <Popover content={`Mở khoá`} trigger="hover">
                                <Button
                                    onClick={() => {
                                        handleLock(record)
                                    }}
                                    size={`large`}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        padding: '0px 20px',
                                    }}>
                                    <UnlockOutlined style={{
                                        fontSize: '18px',
                                        cursor: 'pointer',
                                        // xanh
                                        color: '#52c41a',
                                    }}/>
                                </Button>
                            </Popover>
                    }

                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(record)}
                        okText="Xoá"
                        cancelText="Hủy"
                    >
                        <Popover content={`Xoá`} trigger="hover">
                            <Button danger size={`large`} style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '0px 20px',

                            }}>
                                <DeleteOutlined
                                    style={{
                                        fontSize: '18px',
                                        cursor: 'pointer',
                                        //đỏ
                                        color: '#f5222d',
                                    }}/>
                            </Button>
                        </Popover>
                    </Popconfirm>
                    <Popover content={`Xem chi tiết`} trigger="hover">
                        <Button
                            onClick={() => {
                                setIsDetailModalOpen(true)
                                handleSelectUser(record)
                            }}
                            size={`large`}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '0px 20px',
                            }}>
                            <EyeOutlined style={{
                                fontSize: '18px',
                                cursor: 'pointer',
                                //xanh
                                color: '#52c41a',
                            }}/>
                        </Button>
                    </Popover>
                </Space>
            ),
        },
    ];


    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const handleSelectUser = (record: UserData) => {
        console.log(record)
    }

    const handleOnChangeRole = (value: ERole, record: UserData) => {
        dispatch(updateRoleAsyncThunk({
            id: record.id,
            role: value
        }))
    }


    const handleLock = (record: UserData) => {
        dispatch(lockUserAsyncThunk({
            id: record.id,
            isLocked: !record.isLocked
        }))
    }

    const handleDelete = (record: UserData) => {
        dispatch(deleteUserAsyncThunk(record.id))
    }

    const dispatch = useAppDispatch()


    const {users , isLoading , order , meta} = useAppSelector((state) => state.users)

    useEffect(() => {
        dispatch(getUsersAsyncThunk({
            ...meta,
            order
        }))
    }, [dispatch, order , meta.itemCount])


    const handleQuery = (page: number, pageSize?: number) => {
        dispatch(getUsersAsyncThunk({
            ...meta,
            page,
            take: pageSize
        }))
    }

    return (
        <div style={{
            padding: 24,
        }}>
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bodyStyle={{
                            padding: 0,
                        }}
                        headStyle={{
                            padding: 15,
                        }}
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="DANH SÁCH NGƯỜI DÙNG"
                        extra={
                            <>
                                <Button
                                    onClick={() => {
                                        setIsCreateModalOpen(true);
                                    }}
                                    type="primary"
                                    style={{
                                        width: '150px',
                                        height: '50px',
                                    }} size="large">
                                    THÊM MỚI
                                </Button>
                            </>
                        }
                    >
                        <div>
                            <Table
                                loading={isLoading}
                                columns={columns}
                                dataSource={users}
                                pagination={false}
                                className="ant-border-space"
                            />
                            <Space direction={`horizontal`} style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '20px',
                                marginBottom: '20px'
                            }}>
                                <Pagination
                                    current={meta.page}
                                    showQuickJumper
                                    defaultCurrent={1}
                                    total={meta.itemCount}
                                    pageSize={meta.take}
                                    showSizeChanger
                                    onChange={handleQuery}
                                />
                            </Space>
                        </div>
                    </Card>
                </Col>
            </Row>
            <UserCreateModal
                isModalOpen={isCreateModalOpen}
                setIsModalOpen={setIsCreateModalOpen}
                key={Math.random()}
            />
            <UserDetailModal
                isModalOpen={isDetailModalOpen}
                setIsModalOpen={setIsDetailModalOpen}
                key={Math.random()}
            />
        </div>

    )
}


export default Users