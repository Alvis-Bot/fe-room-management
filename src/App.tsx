import Router from "./router";
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import store from "./redux/store.ts";
import {CookiesProvider, useCookies} from 'react-cookie';

function App() {
    const [cookies , setCookie] = useCookies(['isLogin']);
    if (!cookies.isLogin) {
        setCookie('isLogin', false, {path: '/'})
    }

    return (
        <>
            {/*@primary-color: #1890ff; // primary color for all components*/}
            {/*@link-color: #1890ff; // link color*/}
            {/*@success-color: #52c41a; // success state color*/}
            {/*@warning-color: #faad14; // warning state color*/}
            {/*@error-color: #f5222d; // error state color*/}
            {/*@font-size-base: 14px; // major text font size*/}
            {/*@heading-color: rgba(0, 0, 0, 0.85); // heading text color*/}
            {/*@text-color: rgba(0, 0, 0, 0.65); // major text color*/}
            {/*@text-color-secondary: rgba(0, 0, 0, 0.45); // secondary text color*/}
            {/*@disabled-color: rgba(0, 0, 0, 0.25); // disable state color*/}
            {/*@border-radius-base: 2px; // major border radius*/}
            {/*@border-color-base: #d9d9d9; // major border color*/}
            {/*@box-shadow-base: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),*/}
            {/*0 9px 28px 8px rgba(0, 0, 0, 0.05); // major shadow for layers*/}

            <ConfigProvider
                componentSize="large"
                // locale={locale}

                theme={{
                    token  : {
                        borderRadius: 4,
                        colorPrimary: '#1890ff',
                        colorLink: '#1890ff',
                     
                    },

                }}
            >
                <CookiesProvider>
                <Provider store={store}>
                    <Router/>
                </Provider>
                </CookiesProvider>
            </ConfigProvider>
        </>
    )
}

export default App
