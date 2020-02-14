import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/health', (req, res) => {
  res
    .status(200)
    .send('All good!')
})

app.use(routes)

app.use((err, req, res, next) =>{
  res.header('Content-Type', 'application/json')
  let send = { error: '' }
  let http_code = typeof err.http_code === 'undefined' ? 500 : err.http_code
  if (typeof err.message !== 'undefined' && err.message !== '') {
    send.error = err.message
  } else {
    if (err.http_code == 400) {
      send.error = 'there was something wrong with that request'
    } else if (err.http_code == 401) {
      send.error = 'you are not authorized to do that'
    } else if (err.http_code == 404) {
      send.error = 'that resource was not found'
    } else if (err.http_code == 403) {
      send.error = 'access denied'
    } else {
      send.error = 'there was a problem'
    }
  }
  res.status(http_code).send(send)
})
// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})