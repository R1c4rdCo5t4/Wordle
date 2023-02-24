import express from 'express'
import errors from '../../utils/errors.js'
import data from '../../data/wordle-data.js'

export default function (db) {

    if (!db) {
        throw errors.INVALID_PARAMETER('db')
    }

    async function newGame(req, rsp) {
        try {
            const result = await data.newGame()
            rsp.json(result)
        }
        catch (e) {
            rsp.status(500).json({ error: e.message })
        }
    }

    async function getGame(req, rsp) {
        try {
            const result = await data.getGame(req.params.gameId)
            rsp.json(result)
        }
        catch (e) {
            rsp.status(500).json({ error: e.message })
        }
    }

    async function playGame(req, rsp) {
        try {
            const { word } = req.body
            if (!word) {
                throw errors.INVALID_PARAMETER('word')
            }
            const result = await data.playGame(word, req.params.gameId)
            rsp.json(result)
        }
        catch (e) {
            rsp.status(500).json({ error: e.message })
        }
    }

    const router = express.Router()
    router.use(express.urlencoded({ extended: true }))
    router.get('/play', newGame)
    router.get('/play/:gameId', getGame)
    router.post('/play/:gameId', playGame)

    return router
}