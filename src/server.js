
import express from 'express'

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static('static-content'))
app.listen(port, () => console.log(`Server listening in http://localhost:${port}`))