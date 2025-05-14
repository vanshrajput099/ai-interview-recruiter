import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className='antialiased w-full min-h-[85vh] flex justify-center items-center'>{children}</div>
    )
}

export default AuthLayout