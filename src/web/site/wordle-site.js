import express from 'express'
import fetch from 'node-fetch'
import url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default function () {

    const baseURL = 'http://localhost:8080/api'
    async function newGame(req, rsp) {
        const result = await fetch(baseURL + '/play')

        if (result.ok) {
            const game = await result.json()
            rsp.redirect('/play/' + game.id)
        }
        else {
            rsp.status(500).json({ error: result.statusText })
        }
        
    }

    async function getGame(req, rsp) {
        const result = await fetch(baseURL + '/play/' + req.params.gameId)

        if (result.ok) {
            const game = await result.json()
            rsp.render('game', game)
        }
        else {
            rsp.status(500).json({ error: result.statusText })
        }
    }

    async function playGame(req, rsp) {
        const { guess } = req.body
    
        if (!guess) {
            throw errors.INVALID_PARAMETER('guess')
        }
        const result = await fetch(baseURL + '/play/' + req.params.gameId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ guess })
        })
        const json = await result.json()
        if (result.ok) {
            rsp.render('game', json)
        }
        else {
            rsp.status(500).json(json)
        }
    }

    const router = express.Router()
    router.use(express.urlencoded({ extended: true }))
    router.get('/styles.css', (req, rsp) => rsp.sendFile(__dirname + '/views/styles.css', rsp))
    router.get('/play', newGame)
    router.get('/play/:gameId', getGame)
    router.post('/play/:gameId', playGame)
    
    return router
}
