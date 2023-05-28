
import api from './wordle-api.js'
import data from './wordle-data.js'
import express from 'express'

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', api(data))
app.use('/', express.static('static-content'))

app.listen(port, () => console.log(`Server listening in http://localhost:${port}`))