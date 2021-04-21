if (process.env.NODE_ENV == "development") {
  require('dotenv').config();
}

const cors = require('cors');
const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes/index');
const errHandler = require('./middleware/error-handler');

app.use(cors())
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

app.use(router)
app.use(errHandler)
app.listen(PORT, () => {
  console.log(`This apps is running on http://localhost:${PORT}`)
})