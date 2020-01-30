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

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})