import NotFound from "../assets/Illustration/NotFound.tsx";
import {Button, Space, Typography} from "antd";

const Page404 = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				backgroundColor: '#f5f5f5'
			}}
		>
			<NotFound />
			<Space direction="vertical" size="large" align={`center`}>
				<Typography.Title level={2}>Page Not Found</Typography.Title>
				<Button style={{ width : 300 }} size={`large`} type="primary" href="/">Về trang chủ</Button>
			</Space>
		</div>
	)
}

export default Page404