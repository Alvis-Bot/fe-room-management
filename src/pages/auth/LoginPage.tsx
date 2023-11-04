import {Avatar, Button, Card, Checkbox, Form, Input, message, Space} from "antd";
import logo from "../../assets/images/logo.ico";
import {AntDesignOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import backgroundImage from "../../assets/background.jpg";
import {AuthService} from "../../api/authService.ts";
import {ILoginPayload} from "../../type.ts";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";


const LoginPage = () => {

    const navigate = useNavigate()
    const [form] = Form.useForm();
    const onFinish = (values: ILoginPayload) => {
        console.log('Received values of form: ', values);
        AuthService.login(values)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('accessToken', res.data.accessToken)
                localStorage.setItem('isLogin', 'true')
                navigate('/')
            }).catch((err : any) => {
            console.log(err)
            message.error('Đăng nhập thất bại')
        })
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };



    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card style={{width: 500}}>

                <Space direction="vertical" align={`center`} style={{width: "100%"}} >
                    <Avatar
                        size={90}
                        src={logo}
                        style={{marginBottom: 20}}
                    />
                </Space>
                <Form
                    layout={"vertical"}
                    form={form}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label={`Username`}
                        name="username"
                        rules={[{required: true, message: "Vui lòng nhập tên đăng nhập!"}]}
                    >
                        <Input
                            size={`large`}
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                        />
                    </Form.Item>
                    <Form.Item
                        label={`Password`}
                        name="password"
                        rules={[{required: true, message: "Vui lòng nhập mật khẩu!"}]}
                    >
                        <Input
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default LoginPage