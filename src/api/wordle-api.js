import express from 'express'
import errors from '../../utils/cmdb-errors.mjs'

export default function (api) {

    if (!api) {
        throw errors.INVALID_PARAMETER('api')
    }

    async function getGame(req, rsp) {
        try {
            const result = await api.wordle.get()
            rsp.json(result)
        }
        catch (err) {
            rsp.status(500).json({ error: err.message })
        }
    }

    async function playGame(req, rsp) {
        try {
            const { word } = req.body
            if (!word) {
                throw errors.INVALID_PARAMETER('word')
            }
            const result = await api.wordle.play(word)
            rsp.json(result)
        }
        catch (err) {
            rsp.status(500).json({ error: err.message })
        }
    }

    const router = express.Router()
    router.use(express.urlencoded({ extended: true }))

    router.get('/play', getGame)
    router.post('/play', playGame)

    return router
}