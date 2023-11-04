
import {
    Button,
    DatePicker,
    DatePickerProps,
    Descriptions,
    DescriptionsProps,
    Form,
    Input,
    Modal, QRCode, Space,
    TimePicker,
    TimePickerProps
} from "antd";
import {FC} from "react";
import type { Dayjs } from 'dayjs';
import {EventPayload} from "../../type.ts";
import {useAppDispatch} from "../../redux/hooks.ts";
import {createEventAsyncThunk} from "../../redux/slices/event.ts";


type AttendanceQRModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void
}



const AttendanceQRModal: FC<AttendanceQRModalProps> = ({isModalOpen, setIsModalOpen}) => {

    return (
        <Modal
            centered={true}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            open={isModalOpen}>
           <Space

                direction="vertical"
                style={{ width: '100%' ,marginTop: '30px' }}
                align="center"
           >
               <QRCode
                   size={456}
                   value="http://facebook.github.io/react/" />
              </Space>
        </Modal>
    )
}

export default AttendanceQRModal