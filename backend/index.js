const express = require('express')
const fuelRoutes = require('./routes/fuelRoutes')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use('/api/fuel', fuelRoutes)

app.get('/', (req, res) => {
  res.send('Full Fuel')
})

app.listen(port, () => {
    console.log('Listening on Port 3000 for fuel data')
})