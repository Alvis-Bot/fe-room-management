
import {
    Button,
    DatePicker,
    DatePickerProps,
    Descriptions,
    DescriptionsProps,
    Form,
    Input,
    Modal,
    TimePicker,
    TimePickerProps
} from "antd";
import {FC} from "react";
import type { Dayjs } from 'dayjs';
import {EventPayload} from "../../type.ts";
import {useAppDispatch} from "../../redux/hooks.ts";
import {createEventAsyncThunk} from "../../redux/slices/event.ts";


type UserDetailModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void
}



const UserDetailModal: FC<UserDetailModalProps> = ({isModalOpen, setIsModalOpen}) => {

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'UserName',
            children: 'Zhou Maomao',
        },
        {
            key: '2',
            label: 'Telephone',
            children: '1810000000',
        },
        {
            key: '3',
            label: 'Live',
            children: 'Hangzhou, Zhejiang',
        },
        {
            key: '4',
            label: 'Address',
            span: 2,
            children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
        },
        {
            key: '5',
            label: 'Remark',
            children: 'empty',
        },
    ];

    return (
        <Modal
            centered={true}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            title="CHI TIẾT NGƯỜI DÙNG" open={isModalOpen}>
            <Descriptions title="User Info" layout="vertical" items={items} />
        </Modal>
    )
}

export default UserDetailModal