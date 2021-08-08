const express = require('express')
require('./lib/mongodb')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use("/api", require('./routes/item.routes'))

app.listen(process.env.PORT || 8000, () => console.log(`running on 8000`))

