import {Button, Card, Carousel, Col, Descriptions, Empty, Row, Space} from "antd";
import {
    AppstoreAddOutlined,
    AppstoreOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import React, {useEffect} from "react";
import {deleteRoomAsyncThunk, getRoomsAsyncThunk, searchRooms} from "../../redux/slices/rooms.ts";
import {donCheckGetImageUrl} from "../../utils/code.ts";
import {useNavigate} from "react-router-dom";
import Search from "antd/es/input/Search";
import RoomCreateModal from "../../component/modal/RoomCreateModal.tsx";



const Rooms = () => {


    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const {rooms, isLoading, meta, search , order} = useAppSelector(state => state.rooms)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getRoomsAsyncThunk({
            ...meta,
            order,
            search
        }))
    }, [dispatch, meta.page, meta.take, order ,search])


    console.log(rooms)

    const onSearch = (value: string) => {
        console.log(value)
        dispatch(searchRooms(value))
    }


    return (
        <div style={{
            padding: 20,
            backgroundColor: "inherit",
            borderRadius: 20,
            overflow: 'hidden',
        }}>

            <div
                style={{
                    margin: "0 0 20px 0",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                }}
            >

                <Space>
                    <Search placeholder="Tìm kiếm theo tên"
                        onSearch={onSearch}
                            enterButton/>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            borderRadius: "4px",
                        }}
                        icon={<AppstoreAddOutlined/>}
                        type="primary">Tạo phòng</Button>
                </Space>

            </div>
            <Row gutter={[24, 0]}>
                <Col xl={24}>
                    <Row gutter={[24, 40]}>
                        {
                            isLoading ? <>Loading</> :
                                rooms.length === 0 ?
                                    <Col
                                        style={{
                                            height: '100%'
                                        }}

                                        span={24}>
                                        <Card
                                            bordered={false}>
                                            <Empty description={
                                                <span>
                                                    Không có phòng nào
                                                </span>
                                            }/>
                                        </Card>

                                    </Col>
                                    :
                                    rooms.map((room) => (

                                        <Col span={6}>
                                            <Card
                                                cover={
                                                    <Carousel >
                                                        {
                                                            // giới hạn 5 ảnh
                                                            room.images.slice(0, 5).map((image) => (
                                                                <div>
                                                                    <img
                                                                        style={{
                                                                            height: 200,
                                                                            width: '100%',
                                                                            objectFit: 'cover'
                                                                        }}
                                                                        src={donCheckGetImageUrl(image)}
                                                                        alt=""/>
                                                                </div>
                                                            ))
                                                        }

                                                    </Carousel>

                                                }
                                                actions={[
                                                    <AppstoreOutlined
                                                        onClick={() => {
                                                            navigate(`/rooms/${room.id}`)
                                                        }}
                                                        key="detail"/>,
                                                    <EditOutlined key="edit"/>,
                                                    <DeleteOutlined
                                                        onClick={() => {
                                                            dispatch(deleteRoomAsyncThunk(room.id))
                                                        }}
                                                        key="delete"/>
                                                ]}
                                                bordered={false}>
                                                <Descriptions
                                                    layout={"horizontal"}
                                                    title={room.name}
                                                    bordered={false}
                                                    items={[
                                                        // {
                                                        //     label: 'Số lượng',
                                                        //     span: 2,
                                                        //     children: room.quantity
                                                        // },
                                                        {
                                                            label: 'Quản lý',
                                                            span: 2,
                                                            children: 'Nguyễn Văn A'
                                                        },
                                                        {
                                                            label: 'Mô tả',
                                                            span: 2,
                                                            children: `Phòng AI LAP nơi bạn có thể tìm thấy sự thoải mái nhất`
                                                        }
                                                    ]}
                                                    size="small"
                                                    column={1}
                                                />
                                            </Card>
                                        </Col>
                                    ))
                        }

                    </Row>
                </Col>
            </Row>

            <RoomCreateModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

        </div>
    )
}

export default Rooms