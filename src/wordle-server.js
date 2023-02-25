
import apiInit from './web/api/wordle-api.js'
import siteInit from './web/site/wordle-site.js'
import data from './data/wordle-data.js'
import express from 'express'
import url from 'url'
import path from 'path'


const api = apiInit(data)
const site = siteInit()

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', api)
app.use('/', site)

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'web', 'site', 'views'))

app.use((req, rsp) => {
    rsp.status(404).render('notfound')
})

app.listen(port, () => console.log(`Server listening in http://localhost:${port}`))