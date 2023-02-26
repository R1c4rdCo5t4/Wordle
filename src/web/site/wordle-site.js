import express from 'express'
import fetch from 'node-fetch'
import url from 'url'
import errors from '../../utils/errors.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))


const colors = {
	green: '#338f28',
	yellow: '#cfcf00',
	gray: '##dcdcdc8f',
}

function wordHint(guessWord, correctWord) {

	if (guessWord.length != correctWord.length) {
		throw new Error("Words must be the same length.")
	}
	let pairs = []
	for (let i = 0; i < guessWord.length; i++) {
		const guess = guessWord[i].toLowerCase()
		switch(true) {
			case guess == correctWord[i]: pairs.push({ color: colors.green, letter: guess }); break
			case correctWord.includes(guess): pairs.push({ color: colors.yellow, letter: guess }); break
			default: pairs.push({ color: colors.gray, letter: guess }); break
		}
	}
	return pairs
}

function getWords(game) {
    const copy = { ...game }
    copy.guessedWords = copy.guessedWords.map(word => wordHint(word, game.word))
    
    const obj = Array(5).fill({ color: 'transparent', letter: '_' }).map(x => ({ ...x }))
    while (copy.guessedWords.length < 6) copy.guessedWords.push(obj)
    console.log(copy.guessedWords)
    return copy
}

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
            const copy = getWords(game)
            rsp.render('layout', copy)
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
        try {
            const result = await fetch(baseURL + '/play/' + req.params.gameId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ guess:guess })
            })
            const json = await result.json()
            if (result.ok) {
                const copy = getWords(json)
                rsp.render('layout', copy)
            } else {
                rsp.status(500).json(json)
            }
        }
        catch(err) {
            rsp.status(500).json({ error: err.message })
        }
    }

    const router = express.Router()
    router.use(express.urlencoded({ extended: true }))
    router.get('/styles.css', (req, rsp) => rsp.sendFile(__dirname + '/views/styles.css', rsp))
    router.get('/client.js', (req, rsp) => rsp.sendFile(__dirname + '/client.js', rsp))
    router.get('/play', newGame)
    router.get('/play/:gameId', getGame)
    router.put('/play/:gameId', playGame)
    router.get('/', (req, rsp) => rsp.redirect('/play'))
    
    return router
}
