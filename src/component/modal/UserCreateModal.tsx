import {Button, Form, Input, Modal, Radio} from "antd";
import {FC} from "react";
import {EGenders} from "../../utils/contains.ts";
import {MailOutlined} from "@ant-design/icons";
import {UserCreatePayload} from "../../type.ts";
import {useAppDispatch} from "../../redux/hooks.ts";
import {createUserAsyncThunk} from "../../redux/slices/users.ts";

type UserCreateModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void
}



const UserCreateModal: FC<UserCreateModalProps> = ({isModalOpen, setIsModalOpen}) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const onFinish = (values : UserCreatePayload) => {
        console.log(values)
        dispatch(createUserAsyncThunk(values))
        form.resetFields();
        setIsModalOpen(false)
    }

    return (
        <Modal
            centered={true}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            title="TẠO TÀI KHOẢN" open={isModalOpen}
        >
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical">
                <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{required: true, message: 'Vui lòng nhập họ và tên!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="studentCode"
                    label="Mã sinh viên"
                    rules={[{required: true, message: 'Vui lòng nhập mã sinh viên!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{required: true, message: 'Vui lòng nhập email!'}]}
                >
                    <Input prefix={<MailOutlined />}   type="email"/>
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Tên đăng nhập"
                    rules={[{required: true, message: 'Vui lòng nhập tên đăng nhập!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Giới tính"

                >
                    <Radio.Group>
                        <Radio value={EGenders.MALE}>Nam</Radio>
                        <Radio value={EGenders.FEMALE}>Nữ</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Button
                        style={{
                            width: '100%'

                        }}
                        type="primary" htmlType="submit">
                        Tạo tài khoản
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}


export default UserCreateModal