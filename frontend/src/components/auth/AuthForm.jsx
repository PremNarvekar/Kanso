import React from "react"
import Login from './Login'
import Register from './Register'

const AuthForm = ({ isLogin, onSubmit }) => {
    return isLogin ? <Login onSuccess={onSubmit} /> : <Register onSuccess={onSubmit} />
}

export default AuthForm;
