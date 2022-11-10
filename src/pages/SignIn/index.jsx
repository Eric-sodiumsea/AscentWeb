import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SignIn() {
    return (
        <div>
            <button>
                <NavLink to="/admin/products">管理员登录</NavLink>
            </button>
            <br />
            <button>
                <NavLink to="/user/products">普通用户登录</NavLink>
            </button>
            <br />
            <NavLink to="/signup">去注册</NavLink>
        </div>
    )
}
