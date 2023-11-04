import {Button, Form, Input, Modal, Radio, Upload} from "antd";
import {FC} from "react";
import {MailOutlined, PlusOutlined} from "@ant-design/icons";
import {RoomCreatePayload} from "../../type.ts";
import {useAppDispatch} from "../../redux/hooks.ts";
import {createRoomAsyncThunk} from "../../redux/slices/rooms.ts";
import {UploadFile} from "antd/es/upload/interface";


type RoomCreateModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void
}

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const RoomCreateModal: FC<RoomCreateModalProps> = ({isModalOpen, setIsModalOpen}) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()

    const onFinish = (values: RoomCreatePayload) => {
        console.log(values)
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('quantity', values.quantity.toString());
        values.image.map((item: UploadFile) => {
            formData.append('image', item.originFileObj as Blob);
        })
        dispatch(createRoomAsyncThunk(formData))
        form.resetFields();
        setIsModalOpen(false)
    }
    return (
        <Modal
            centered={true}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            title="TẠO PHÒNG" open={isModalOpen}
        >
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical">
                <Form.Item
                    name="name"
                    label="Tên phòng"
                    rules={[{required: true, message: 'Vui lòng nhập tên phòng!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Số lượng ghế"
                    rules={[{required: true, message: 'Vui lòng nhập số lượng ghế!'}]}
                >
                    <Input type="number" min={0}/>
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList" name="image"
                           getValueFromEvent={normFile}>
                    <Upload listType="picture-card">
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Ảnh phòng</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button
                        style={{
                            width: '100%'

                        }}
                        type="primary" htmlType="submit">
                        Tạo phòng
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}


export default RoomCreateModal