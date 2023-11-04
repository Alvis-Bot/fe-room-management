import {Button, DatePicker, DatePickerProps, Form, Input, Modal, Select, TimePicker, TimePickerProps} from "antd";
import {FC, useEffect} from "react";
import type { Dayjs } from 'dayjs';
import {EventPayload} from "../../type.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {createEventAsyncThunk} from "../../redux/slices/event.ts";
import {getAllRoomsAsyncThunk} from "../../redux/slices/rooms.ts";
import {useForm} from "antd/es/form/Form";


type EventModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void
}


//tạo sự kiện
const EventCreateModal: FC<EventModalProps> = ({isModalOpen, setIsModalOpen}) => {

    const { allRooms } =useAppSelector(state => state.rooms)
    const [form] = Form.useForm();

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllRoomsAsyncThunk())
    }, [dispatch]);

    const onFinish = (values: EventPayload) => {
        console.log(values)
        const startTimes = values.time[0].format('HH:mm')
        const endTimes = values.time[1].format('HH:mm')
        const date = values.date.format('YYYY-MM-DD')
        const data = {
            ...values,
            startTime: startTimes,
            endTime: endTimes,
            date: date
        }
        dispatch(createEventAsyncThunk(data))
        form.resetFields();
        setIsModalOpen(false)
    };

    return (
        <Modal
            centered={true}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            title="TẠO SỰ KIỆN" open={isModalOpen}>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical" >
                <Form.Item
                    name="name"
                    label="Tên sự kiện"
                    rules={[{required: true, message: 'Please input the title of collection!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Địa điểm"
                    rules={[{required: true, message: 'Please input the location of collection!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="minParticipants"
                    label="Số lượng tối thiểu"
                    rules={[{required: true, message: 'Please input the location of collection!'}]}
                >
                    <Input
                        type="number"
                        min={0}
                    />
                </Form.Item>
                <Form.Item
                    name="roomId"
                    label="Thuộc phòng"
                    rules={[{required: true, message: 'Please input the organizer of collection!'}]}
                >
                    <Select
                        placeholder="Chọn người tổ chức"
                        allowClear
                    >
                        {
                            allRooms.map((room) => (
                                <Select.Option value={room.id}>{room.name}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Thời gian"
                    rules={[{required: true, message: 'Please input the time of collection!'}]}
                >
                    <DatePicker
                    />
                </Form.Item>

                <Form.Item
                    name="time"
                    rules={[{required: true, message: 'Please input the time of collection!'}]}
                >
                    <TimePicker.RangePicker
                        format="HH:mm"
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                >
                    <Input.TextArea rows={4}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Tạo sự kiện
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EventCreateModal