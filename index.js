const express = require('express')
const app = express()
const dotenv = require('dotenv').config()

const port = process.env.PORT


app.get('/', (req,res) => {
    res.json("IMF API")
})


app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

