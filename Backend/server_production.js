const express = require('express')
const app = express()

const PORT = 3000

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.listen(PORT, () => {
    console.log('Server listening at http://localhost:3000')
})