import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

export function render(url, helmetContext) {
    const html = ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </React.StrictMode>
    )
    return { html }
}
