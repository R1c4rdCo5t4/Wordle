import express from 'express'
import errors from '../../utils/errors.js'


export default function (data) {

    if (!data) {
        throw errors.INVALID_PARAMETER('db')
    }

    async function newGame(req, rsp) {
        try {
            const game = await data.newGame()
            rsp.json(game)
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
            const { guess } = req.body
            if (!guess) {
                throw errors.INVALID_PARAMETER('guess')
            }
            const result = await data.playGame(guess, req.params.gameId)
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