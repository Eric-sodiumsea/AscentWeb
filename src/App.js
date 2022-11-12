import React from 'react'
import { useRoutes } from 'react-router-dom'
import Frame from './components/Frame';
import { adminRoutes } from './routes'
import { userRoutes } from './routes'
import { loginRoutes } from './routes'
import './App.css'

export default function App() {
    const adminElement = useRoutes(adminRoutes);
    const userElement = useRoutes(userRoutes);
    const loginElement = useRoutes(loginRoutes);
    let url = window.location.href.split('/')[3];
    if (url === "admin") {
        return (
            <Frame url={url}>
                {adminElement}
            </Frame >
        )
    } else if (url === "user") {
        return (
            <Frame url={url}>
                {userElement}
            </Frame >
        )
    } else {
        return (
            <>
                {loginElement}
            </>
        )
    }
}