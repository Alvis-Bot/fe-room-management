import {
    Badge,
    Button, Calendar, CalendarProps,
    Card,
    Col, Descriptions, Form, Pagination, Popover,
    Row,
    Select,
    SelectProps,
    Space,
    Table, Tooltip
} from "antd";
import React, {useEffect} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {getAllRoomsAsyncThunk} from "../../redux/slices/rooms.ts";
import Title from "antd/es/typography/Title";
import {
    AppstoreAddOutlined, BorderlessTableOutlined,
     CheckOutlined, CloseCircleTwoTone,
    FileExcelOutlined,
    PlayCircleTwoTone, QuestionCircleTwoTone, TabletOutlined,
} from "@ant-design/icons";
import {EventData} from "../../type.ts";
import {ColumnsType} from "antd/es/table";

import Search from "antd/es/input/Search";
import EventCreateModal from "../../component/modal/EventCreateModal.tsx";
import {getEventsAsyncThunk} from "../../redux/slices/event.ts";
import {EventDetailModal} from "../../component/modal/EventDetailModal.tsx";
import {Dayjs} from "dayjs";
import {EEventStatus} from "../../utils/contains.ts";
import { Line } from 'react-chartjs-2';
import {faker} from "@faker-js/faker";
import {CategoryScale, Filler, Legend, LinearScale,
    Title as TitleJS, Tooltip as TooltipJS,
    LineElement, PointElement ,  Chart as ChartJS} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TitleJS,
    TooltipJS,
    Filler,
    Legend
);


const IconBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const count = [
    {
        today: "Tổng sự kiện",
        title: "12",
        background: "#E6F6F1",
        icon: <CheckOutlined
            style={{fontSize: "20px"}}
            twoToneColor={"#09A96F"}
        />
    },
    {
        today: "Sự kiện đang diễn ra",
        title: "1",
        background: 'rgb(254, 245, 229)',
        icon: <QuestionCircleTwoTone twoToneColor={"#FF4D4F"} style={{fontSize: "20px"}}/>,
    },
    {
        today: "Sự kiện bị hủy",
        title: "2",
        background: 'rgb(254, 242, 242)',
        icon: <CloseCircleTwoTone twoToneColor={"#FF4D4F"} style={{fontSize: "20px"}}/>,
    },
    {
        today: "Sự kiện hoàn thành",
        title: "10",
        background: 'rgb(229, 240, 255)',
        icon: <PlayCircleTwoTone twoToneColor={"#09A96F"} style={{fontSize: "20px"}}/>,
    },
];

export const optionsT = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Biểu đồ thống kê sự kiện',
        },
    },
};


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const dataT = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Tổng sự kiện',
            data: [25, 20, 30, 22, 17, 29, 22],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        
    ],
};
export const EventPage = () => {

    const dispatch = useAppDispatch();
    const {events, meta, order, isLoading} = useAppSelector(state => state.events)
    const {allRooms} = useAppSelector(state => state.rooms)
    const [isModeCalendar, setIsModeCalendar] = React.useState(false);


    useEffect(() => {
        dispatch(getAllRoomsAsyncThunk())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getEventsAsyncThunk({
            page: 1,
            take: 10,
            order: order
        }))
    }, [dispatch, order]);
    const columns: ColumnsType<EventData> = [
        {
            title: 'Tên sự kiện',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
            key: 'location',
        },

        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => {
                if (text === EEventStatus.COMPLETED) {
                    return <Badge status="success" text="Hoàn thành"/>;
                }
                if (text === EEventStatus.CANCELED) {
                    return <Badge status="error" text="Đã hủy"/>;
                }
                if (text === EEventStatus.IN_PROGRESS) {
                    return <Badge status="processing" text="Đang diễn ra"/>;
                }
                return <Badge status="default" text="Chưa bắt đầu"/>;
            }
        },

        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
            render: (_text: string, record: EventData) => (
                <Space size="middle">
                    <Button
                        onClick={
                            () => {
                                setIsDetailModalOpen(true)
                                setSelectedIdsetSelectedId(record.id)
                            }
                        }
                        type="primary">Xem chi tiết</Button>
                </Space>
            ),
        }
    ]

    const options: SelectProps['options'] = [];

    allRooms.map((room) => (
        options.push({label: room.name, value: room.id})
    ))


    const onChange = (value: number) => {
        console.log(value)
        dispatch(getEventsAsyncThunk({
            page: 1,
            take: 10,
            order: order,
            roomId: value
        }))

    }


    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);
    const [selectedId, setSelectedIdsetSelectedId] = React.useState<number>(0);

    const onSearch = (value: string) => {
        dispatch(getEventsAsyncThunk({
            page: 1,
            take: 10,
            order: order,
            search: value.trim()
        }))
    }
    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        // if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    const handleQuery = (page: number, pageSize?: number) => {
        dispatch(getEventsAsyncThunk({
            ...meta,
            page,
            take: pageSize
        }))
    }


    const dateCellRender = (value: Dayjs) => {
        const listData = events.filter((event) => event.date.toString() === value.format("YYYY-MM-DD"));
        return (
            <ul
                style={{
                    listStyle: "none",
                    padding: "0",
                    margin: "0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}
                className="events">
                {listData.map((item) => (
                    <li
                        style={{
                            padding: "5px 0",
                            borderBottom: "1px solid #f0f0f0",
                            width: "100%",

                        }}
                        key={item.id}>
                        <p
                            style={{
                                color: "#1890ff",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >{item.name}</p>
                        <p>{item?.startTime.toString()} - {item?.endTime.toString()}</p>
                        <p>{item?.location}</p>
                    </li>
                ))}
            </ul>
        );
    };
    return (
        <>
            <Row gutter={[24, 24]}>
                <Col span={12} xs={24} md={12} lg={12} xl={12}>
                    <Row
                        gutter={[24, 24]}
                        style={{
                            width: "100%",
                        }}
                    >
                        {count.map((c, index) => (
                            <Col
                                key={index}
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={12}
                                className="mb-24"
                            >
                                <Card bordered={false} className="criclebox ">
                                    <div className="number">
                                        <Row align="middle" gutter={[24, 0]}>
                                            <Col xs={18}>
                                        <span
                                            style={{
                                                textTransform: 'uppercase'
                                            }}
                                        >{c.today}</span>
                                                <Title
                                                    level={3}>
                                                    + {c.title}
                                                </Title>
                                            </Col>
                                            <Col xs={6}>
                                                <IconBox
                                                    style={{
                                                        backgroundColor: c.background,
                                                    }}
                                                >{c.icon}</IconBox>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col
                    span={12}
                    xs={24}
                    md={12} lg={12} xl={12}
                    style={{
                        width: "100%",
                    }}
                >
                    <Line
                        style={{
                            minHeight: '200px'
                        }}
                        // fullWidth
                        height={'100%'}
                        options={optionsT} data={dataT}/>
                </Col>

            </Row>

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
                    <Select
                        style={{width: 200}}
                        placeholder="Chọn phòng"
                        onChange={onChange}
                        options={options}
                    />

                    {
                        isModeCalendar ?
                            <Popover content={`Xem theo bảng`}>
                                <Button
                                    onClick={() => setIsModeCalendar(false)}
                                    type="primary"
                                    shape={`default`}
                                    icon={<TabletOutlined/>}></Button>
                            </Popover> :
                            <Popover content={`Xem theo lịch`}>
                                <Button
                                    onClick={() => setIsModeCalendar(true)}
                                    type="primary"
                                    shape={`default`}
                                    icon={<BorderlessTableOutlined/>}></Button>
                            </Popover>
                    }

                    <Popover content={`Xuất file excel`}>
                        <Button
                            type="dashed"
                            shape={`default`} icon={<FileExcelOutlined/>}></Button>
                    </Popover>

                </Space>
                <Space>
                    <Search placeholder="Tìm kiếm theo tên sự kiện" onSearch={onSearch} enterButton/>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            borderRadius: "4px",
                        }}
                        icon={<AppstoreAddOutlined/>}
                        type="primary">Tạo sự kiện</Button>
                </Space>

            </div>


            <div
                style={{
                    marginTop: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                }}
            >
                {
                    isModeCalendar ?
                        <Calendar
                            mode={"month"}
                            // disable mode year
                            cellRender={cellRender}
                        /> :
                        <Table
                            pagination={false}
                            columns={columns}
                            dataSource={events}
                        />
                }
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

            <EventCreateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            <EventDetailModal isOpen={isDetailModalOpen} setIsOpen={setIsDetailModalOpen} selectedId={selectedId}/>
        </>

    )
}

export default EventPage