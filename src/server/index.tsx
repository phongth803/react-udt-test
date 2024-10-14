import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../components/App'
import { StaticRouter } from 'react-router-dom/server'

const PORT = process.env.PORT || 3000

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
      <link rel="icon" href="/favicon.ico" />
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Calculator</title>
      <link rel="stylesheet" href="style.css" />
    </head>
    <body>
      <div id="root">${appHtml}</div> 
      <script src="script.js"></script>
    </body>
    </html>
  `
  res.send(html)
})

app.listen(PORT, () => {
  console.log('Server is listening on http://localhost:3000')
})
