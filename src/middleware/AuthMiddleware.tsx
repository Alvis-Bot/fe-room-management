import React from "react";


type AuthMiddlewareProps = {
    children: React.ReactNode
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({children}) => {

    return (
        <>
            {children}
        </>
    )
}

export default AuthMiddleware