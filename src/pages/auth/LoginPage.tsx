import {Space} from "antd";
import logo from "../../assets/images/logo.ico";
import LoginForm from "../../component/LoginForm.tsx";


const LoginPage = () => {
    return (
      <>
          <Space direction={`vertical`} align={`center`} style={{
              width: `100%`,
              marginBottom: `20px`
          }}>
              <img
                  width={200}
                  src={logo}
                  alt={`logo`}/>
          </Space>
          {/*<Space direction={`vertical`} align={`start`} >*/}
          {/*      <Typography.Title level={3}>Welcome to Vite</Typography.Title>*/}
          {/*</Space>*/}
          <LoginForm/>
      </>
    )
}

export default LoginPage