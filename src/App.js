import React from 'react'
import { useRoutes } from 'react-router-dom'
import Frame from './components/Frame';
import routes from './routes'
import './App.css'

export default function App() {
    const element = useRoutes(routes);
    return (
        <Frame>
            {element}
        </Frame>
    )
}
