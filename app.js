require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT;  //VARIABLE GLOBAL PARA PUERTO

app.get('/', (req, res) => {
  res.send('HOLANDA REYES!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

