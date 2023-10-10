import {Button, Pagination, Popconfirm, Popover, Select, Space, Table, Tag, theme} from "antd";
import Search from "antd/es/input/Search";
import {ColumnsType} from "antd/es/table";
import {EOrder, IUser} from "../../../type.ts";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks.ts";
import {useEffect} from "react";
import {getUsersAsyncThunk} from "../../../redux/slices/users.ts";
import {DeleteOutlined, EyeOutlined, LockOutlined, LogoutOutlined, UnlockOutlined} from "@ant-design/icons";


const Users = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();


    const { users , isLoading , meta } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsersAsyncThunk({
            order: EOrder.ASC,
            page: meta.page,
            take: meta.take,
        }))

    }, [dispatch, meta.page, meta.take , meta.itemCount])



    const columns: ColumnsType<IUser> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            key: 'roles',
            render: (value: string) => {
                return (
                    <>
                        {
                            value === 'ADMIN' ? (
                                <Tag color="red">Manager</Tag>
                            ) : value === 'SALE' ? (
                                <Tag color="blue">SALE</Tag>
                            ) : (
                                <Tag color="green">User</Tag>
                            )
                        }
                    </>
                )
            }
        },
        {
            title: 'Thao tác',
            dataIndex: 'actions',
            key: 'actions',
            fixed: 'right',
            render: (text: string, record: IUser) => (
                <Space size="middle">
                    {/*{*/}
                    {/*    record?.status === 'ACTIVE' ?*/}
                    {/*        <Popover content={`Khoá`} trigger="hover">*/}
                    {/*            <Button*/}
                    {/*                // onClick={() => {*/}
                    {/*                //     handleStatus(record, 'INACTIVE')*/}
                    {/*                //     socket.emit()*/}
                    {/*                // }}*/}
                    {/*                size={`large`}*/}
                    {/*                style={{*/}
                    {/*                    backgroundColor: 'transparent',*/}
                    {/*                    border: 'none',*/}
                    {/*                    padding: '0px 20px',*/}
                    {/*                }}>*/}
                    {/*                <LockOutlined style={{*/}
                    {/*                    fontSize: '18px',*/}
                    {/*                    cursor: 'pointer',*/}
                    {/*                    //đỏ*/}
                    {/*                    color: '#f5222d',*/}
                    {/*                }} />*/}
                    {/*            </Button>*/}
                    {/*        </Popover>*/}
                    {/*        :*/}
                    {/*        <Popover content={`Mở khoá`} trigger="hover">*/}
                    {/*            <Button*/}
                    {/*                // onClick={() => {*/}
                    {/*                //     handleStatus(record, 'ACTIVE')*/}
                    {/*                // }}*/}
                    {/*                size={`large`}*/}
                    {/*                style={{*/}
                    {/*                    backgroundColor: 'transparent',*/}
                    {/*                    border: 'none',*/}
                    {/*                    padding: '0px 20px',*/}
                    {/*                }}>*/}
                    {/*                <UnlockOutlined style={{*/}
                    {/*                    fontSize: '18px',*/}
                    {/*                    cursor: 'pointer',*/}
                    {/*                    // xanh */}
                    {/*                    color: '#52c41a',*/}
                    {/*                }} />*/}
                    {/*            </Button>*/}
                    {/*        </Popover>*/}
                    {/*}*/}

                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        // onConfirm={() => handleDelete(record)}
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
                                    }} />
                            </Button>
                        </Popover>
                    </Popconfirm>
                    <Popover content={`Xem chi tiết`} trigger="hover">
                        <Button
                            // onClick={() => {
                            //     handleSelectUser(record)
                            // }}
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
                            }} />
                        </Button>
                    </Popover>

                </Space>
            ),
        },
    ]


    const handlePageChange = (page: number, pageSize?: number) => {
        dispatch(getUsersAsyncThunk({
            order: EOrder.ASC,
            page: page,
            take: pageSize || 1,
        }))
    }

    return (
        <div style={{
            width : '100%',
            height : '100%',
            padding : '20px',
            background : colorBgContainer

        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <Space direction="horizontal" style={{ width: '100%' }} size={`middle`} align={`center`}>
                    <Space direction={`horizontal`} size={`large`}>
                        <Search
                            style={{ width: 350 }}
                            placeholder="Tìm kiếm"
                            size="large"
                            enterButton
                            // onSearch={onSearch}
                            /*		onChange={(e) => handleSearch(e.target)}*/
                        />
                        <Select className='selectRole' size='large' style={{
                            width: '120px',
                        }} defaultValue='' >
                            <Select.Option value=''>Tất cả</Select.Option>
                            <Select.Option value='ADMIN'>Quản trị viên</Select.Option>
                            <Select.Option value='SALE'>SALE</Select.Option>
                            <Select.Option value='USER'>Người dùng</Select.Option>
                        </Select>
                    </Space>
                </Space>
                <Button
                    // onClick={() => {
                    //     setIsCreateModalOpen(true);
                    // }}
                    type="primary"
                    style={{
                        width: '150px',
                        height: '50px',
                    }} size="large">
                    THÊM MỚI
                </Button>
            </div>
            <Space direction="vertical"
                   style={{
                       width: '100%',
                       overflow: 'hidden',
                       overflowX: 'auto' }}>
                <Table
                    rowKey={"id"}
                    size={"large"}
                    loading={isLoading}
                    columns={columns}
                    pagination={false}
                    dataSource={users}
                >
                </Table>
            </Space>
            <Space direction={`horizontal`} style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px'
            }}>
                <Pagination
                    current={meta.page}
                    showQuickJumper
                    defaultCurrent={1}
                    total={meta.itemCount}
                    pageSize={meta.take}
                    showSizeChanger
                    onChange={handlePageChange}
                />
            </Space>
        </div>
    )
}

export default Users