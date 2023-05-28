import express from 'express'
import errors from './errors.js'


export default function (db) {

    if (!db) {
        throw errors.INVALID_PARAMETER('db')
    }

    function request(callback){
        return async (req, rsp) => {
            try {
                return await callback(req, rsp)
            } catch (e) {
                console.log(e)
                rsp.status(e.status || 500).json(e.message)
            }
        }
    }

    async function newGame(req, rsp) {
        const game = await db.newGame()
        rsp.json(game)
    }

    async function getGame(req, rsp) {
        const result = await db.getGame(req.params.id)
        rsp.json(result)
    }

    async function getGames(req, rsp) {
        const result = await db.getGames()
        rsp.json(result)
    }

    async function updateGame(req, rsp) {
        const { guess } = req.body
        if (!guess) {
            throw errors.INVALID_PARAMETER('guess')
        }
        await db.updateGame(req.params.id, guess)
        rsp.json("Game updated successfully")
    }

    const router = express.Router()
    router.use(express.urlencoded({ extended: true }))
    router.post('/games', request(newGame))
    router.get('/games', request(getGames))
    router.get('/games/:id', request(getGame))
    router.put('/games/:id', request(updateGame))
    return router
}