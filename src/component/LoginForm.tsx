import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";

 const LoginForm = () => {


    const dispatch = useDispatch()

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        // await dispatch(loginAsyncThunk(values))
    };


    return (
        <Form onSubmit={onFinish}
                  style={{width: "350px", margin: "0 auto"}}
            // name="normal_login"
                  className="login-form"
                  initialValues={{
                      remember: true,
                  }}
                  onFinish={onFinish}
        >

            <Form.Item
                name="username"
                rules={[{
                    required: true, message: 'Vui lòng nhập tên đăng nhập!',
                },]}
            >
                <Input
                    rootClassName={`login-form-input`}
                    size={`large`}
                    prefix={<UserOutlined className="site-form-item-icon"/>}
                    type="text"
                    placeholder="username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{
                    required: true, message: 'Hãy nhập mật khẩu',
                },]}
            >
                <Input
                    rootClassName={`login-form-input`}
                    size={"large"}
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button
                    style={{
                        width: "100%", borderRadius: "0px",
                    }}
                    type="primary" size={"large"} htmlType="submit">
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>)
}

export default LoginForm