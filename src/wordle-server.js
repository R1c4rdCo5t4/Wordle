import express from 'express'

const app = express()
const PORT = 8080

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

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))