import {Button, DatePicker, Select, Space, Table} from "antd";
import {AppstoreAddOutlined, FileExcelOutlined, QrcodeOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import AttendanceModal from "../../component/modal/AttendanceModal.tsx";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {getAttendancesAsyncThunk} from "../../redux/slices/attendance.ts";
import {ColumnsType} from "antd/es/table";
import {AttendanceData} from "../../type.ts";
import AttendanceDetailModal from "../../component/modal/AttendanceDetailModal.tsx";
import AttendanceQRModal from "../../component/modal/AttendanceQRModal.tsx";


const AttendancePage = () => {

    const dispatch = useAppDispatch()
    const [selectedId, setSelectedId] = React.useState<number>(0);
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false)
    const [isQRModalOpen, setIsQRModalOpen] = React.useState(false)
    useEffect(() => {
        dispatch(getAttendancesAsyncThunk())
    }, [dispatch])

    const {attendances} = useAppSelector((state) => state.attendances)
    console.log(attendances)

    const columns: ColumnsType<AttendanceData> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => {
                return new Date(text).toLocaleDateString()
            }
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: string) => {
                return new Date(text).toLocaleDateString()
            }
        },

        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
            render: (_text: string, record: AttendanceData) => {
                return (
                    <Space>
                        <Button
                            onClick={() => {
                                setIsDetailModalOpen(true)
                                setSelectedId(record.id)
                            }}
                            type={`dashed`}>Xem chi tiết</Button>

                    </Space>
                )
            }
        },
        {
            title: 'QR Code',
            dataIndex: 'action',
            key: 'action',
            render: (_text: string, record: AttendanceData) => {
                return (
                    <Button
                        onClick={() => setIsQRModalOpen(true)}
                        icon={<QrcodeOutlined />}
                        type="dashed"
                        shape={`default`}></Button>
                )
            }
        }
    ];


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
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            borderRadius: "4px",
                        }}
                        icon={<AppstoreAddOutlined/>}
                        type="primary">Tạo điểm danh</Button>
                </Space>

            </div>


            <div
                style={{
                    marginTop: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                }}
            >

                <Table
                    pagination={false}
                    columns={columns}
                    dataSource={attendances}
                />
            </div>
            <AttendanceModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
            <AttendanceDetailModal
                id={selectedId}
                isModalOpen={isDetailModalOpen}
                setIsModalOpen={setIsDetailModalOpen}
            />
            <AttendanceQRModal
                isModalOpen={isQRModalOpen}
                setIsModalOpen={setIsQRModalOpen}
            />
        </>
    )
}

export default AttendancePage