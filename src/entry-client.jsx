import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')

if (container && container.hasChildNodes()) {
    try {
        ReactDOM.hydrateRoot(
            container,
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        )
    } catch (err) {
        console.warn("Hydration failed, rendering via createRoot:", err)
        ReactDOM.createRoot(container).render(
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        )
    }
} else if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    )
}
