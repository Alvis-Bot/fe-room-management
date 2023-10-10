import {Button, Image, Pagination, Popconfirm, Popover, Space, Table, Tag, theme} from "antd";
import Search from "antd/es/input/Search";
import {ColumnsType} from "antd/es/table";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks.ts";
import {useEffect} from "react";
import {deleteRoomAsyncThunk, getRoomsAsyncThunk, searchRooms} from "../../../redux/slices/rooms.ts";
import {EOrder, IRoom} from "../../../type.ts";
import {DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import {donCheckGetImageUrl} from "../../../utils/code.ts";


const Rooms = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();


    const {rooms, isLoading, meta , search} = useAppSelector((state) => state.rooms);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRoomsAsyncThunk({
            order: EOrder.ASC,
            page: meta.page,
            take: meta.take,
            search:  search !== '' ? search : undefined
        }))

    }, [dispatch, meta.page, meta.take, meta.itemCount, search])


    const handlePageChange = (page: number, pageSize?: number) => {
        dispatch(getRoomsAsyncThunk({
            order: EOrder.ASC,
            page: page,
            take: pageSize || 10,
        }))
    }

    const handleRoomSearch = (value: string) => {
        dispatch(searchRooms(value))
    }

    const handleRoomDelete = (id: number) => {
        dispatch(deleteRoomAsyncThunk(id))
    }


    const columns: ColumnsType<IRoom> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            render: (avatar) => <Image
                preview={{
                    maskClassName: 'custom-ant-image-mask',
                    mask: <EyeOutlined/>,
                }}
                style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',

                }} src={donCheckGetImageUrl(avatar)}
                fallback="data:image/png;base64,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"
            />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (value: string) => {
                return (
                    <>
                        {
                            value === 'ACTIVE' ? (
                                <Tag color="green">Active</Tag>
                            ) : (
                                <Tag color="red">Inactive</Tag>
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
            width: 200,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render: (_text, record) => (
                <Space size="middle">

                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleRoomDelete(record.id)}
                        okText="Xoá"
                        cancelText="Hủy"
                    >
                        <Popover content={`Xoá`} trigger="hover">
                            <Button danger size={`large`}
                                    style={{
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
                            }}/>
                        </Button>
                    </Popover>

                </Space>
            ),
        },
    ]

    return (
        <div style={{
            width: '100%',
            height: '100%',
            padding: '20px',
            background: colorBgContainer

        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <Space direction="horizontal" style={{width: '100%'}} size={`middle`} align={`center`}>
                    <Space direction={`horizontal`} size={`large`}>
                        <Search
                            style={{width: 350}}
                            placeholder="Tìm kiếm"
                            size="large"
                            enterButton
                            onSearch={handleRoomSearch}
                        />
                        {/*<Select className='selectRole' size='large' style={{*/}
                        {/*    width: '120px',*/}
                        {/*}} defaultValue='' >*/}
                        {/*    <Select.Option value=''>Tất cả</Select.Option>*/}
                        {/*    <Select.Option value='ADMIN'>Quản trị viên</Select.Option>*/}
                        {/*    <Select.Option value='SALE'>SALE</Select.Option>*/}
                        {/*    <Select.Option value='USER'>Người dùng</Select.Option>*/}
                        {/*</Select>*/}
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
                       overflowX: 'auto'
                   }}>
                <Table
                    rowKey={"id"}
                    size={"large"}
                    loading={isLoading}
                    columns={columns}
                    pagination={false}
                    dataSource={rooms}
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

export default Rooms