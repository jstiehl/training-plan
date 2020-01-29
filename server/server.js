import express from 'express'

const app = express()

app.get('/health', (req, res) => {
  res
    .status(200)
    .send('All good!')
})

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})