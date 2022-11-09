import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SignUp() {
    return (
        <div>
            <button>注册</button>
            <br />
            <NavLink to="/signin">去登录</NavLink>
        </div>
    )
}
