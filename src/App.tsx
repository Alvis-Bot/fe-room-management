import Router from "./router";
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import store from "./redux/store.ts";


function App() {
    return (
        <>

            <ConfigProvider
                componentSize="large"
                theme={{
                    token: {
                        borderRadius: 4
                    }
                }}
            >
                <Provider store={store}>
                    <Router/>
                </Provider>
            </ConfigProvider>
        </>
    )
}

export default App
