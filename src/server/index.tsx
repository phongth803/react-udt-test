import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../components/App'
import { StaticRouter } from 'react-router-dom/server'

const app = express()

app.use(express.static('dist'))

app.get('*', (req, res) => {
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  )
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>SSR with React</title>
    </head>
    <body>
      <div id="root">${appHtml}</div> <!-- This is where the React app gets injected -->
      <script src="script.js"></script> <!-- Client-side script -->
    </body>
    </html>
  `
  res.send(html)
})

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000')
})
