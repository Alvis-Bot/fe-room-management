import {
    Modal, Radio, RadioChangeEvent, Space, Table,
} from "antd";
import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";

import {ColumnsType} from "antd/es/table";
import {AttendanceDetailData, EAttendanceDetailStatus, UserData} from "../../type.ts";
import {
    getAttendanceDetailsAsyncThunk,
    updateStatusAttendanceDetailAsyncThunk
} from "../../redux/slices/attendanceDetails.ts";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type AttendanceDetailModalProps = {
    id: number,
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void
}


const AttendanceDetailModal: FC<AttendanceDetailModalProps> = ({isModalOpen, setIsModalOpen, id}) => {


    const dispatch = useAppDispatch()

    const {attendanceDetails, isLoading} = useAppSelector((state) => state.attendanceDetails)
    useEffect(() => {
        dispatch(getAttendanceDetailsAsyncThunk(id))
    }, [dispatch, id])

    const onChange = (e: RadioChangeEvent, id: number) => {
        console.log('radio checked', e.target.value);
        dispatch(updateStatusAttendanceDetailAsyncThunk({
                id: id,
                status: e.target.value
            })
        )
    };


    const columns: ColumnsType<AttendanceDetailData> = [
        {
            title: 'Họ tên',
            dataIndex: 'user',
            key: 'user',
            render: (text: UserData) => {
                console.log(text.fullName)
                return text.fullName
            }
        },
        {
            title: 'Mã sinh viên',
            dataIndex: 'user',
            key: 'user',
            render: (text: UserData) => {
                return text.email
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text: string, record: AttendanceDetailData) => {
                console.log(text)
                // radio
                return (

                    <Radio.Group
                        onChange={(e) => onChange(e, record.id)}
                        value={text}

                    >
                        <Radio value={EAttendanceDetailStatus.PRESENT}>Có mặt</Radio>
                        <Radio value={EAttendanceDetailStatus.ABSENT}>Vắng mặt</Radio>
                        <Radio value={EAttendanceDetailStatus.LEAVE}>Nghỉ phép</Radio>
                        <Radio value={EAttendanceDetailStatus.LATE}>Đi muộn</Radio>
                    </Radio.Group>
                )
            },
        },

    ]

    const [coMat, setCoMat] = React.useState(0)
    const [vangMat, setVangMat] = React.useState(0)
    const [nghiPhep, setNghiPhep] = React.useState(0)
    const [diMuon, setDiMuon] = React.useState(0)


    useEffect(() => {
        setCoMat(attendanceDetails.filter((item) => item.status === EAttendanceDetailStatus.PRESENT).length)
        setVangMat(attendanceDetails.filter((item) => item.status === EAttendanceDetailStatus.ABSENT).length)
        setNghiPhep(attendanceDetails.filter((item) => item.status === EAttendanceDetailStatus.LEAVE).length)
        setDiMuon(attendanceDetails.filter((item) => item.status === EAttendanceDetailStatus.LATE).length)
    }, [attendanceDetails]);
    const dataset = {
        labels: ['Có mặt', 'Vắng mặt', 'Nghỉ phép', 'Đi muộn'],
        datasets: [
            {
                label: '# of Votes',
                data: [coMat, vangMat, nghiPhep, diMuon],
                backgroundColor: [
                    // có mặt
                    'rgba(255, 99, 132, 0.2)',
                    // vắng mặt
                    'rgba(54, 162, 235, 0.2)',
                    // nghỉ phép
                    'rgba(255, 206, 86, 0.2)',
                    // đi muộn
                    'rgba(75, 192, 192, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    // vắng mặt
                    'rgba(54, 162, 235, 1)',
                    // nghỉ phép
                    'rgba(255, 206, 86, 1)',
                    // đi muộn
                    'rgba(75, 192, 192, 1)',

                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Modal
            centered={true}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            width={1000}
            title="DANH SÁCH ĐIỂM DANH" open={isModalOpen}>
            <Table
                loading={isLoading}
                rowKey={(record) => record.id.toString()}
                columns={columns}
                dataSource={attendanceDetails}
            />
            <Space
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <Pie data={dataset}/>
            </Space>
        </Modal>
    )
}

export default AttendanceDetailModal