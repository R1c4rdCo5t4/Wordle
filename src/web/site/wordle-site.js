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
    const pairs = []
    const correct = []

    // search for correct letters indices
	for (let i = 0; i < guessWord.length; i++) {
        if (guessWord[i].toLowerCase() == correctWord[i]) {
            correct.push(i)
        }
    }

    // get color hints for each letter
    for (let i = 0; i < guessWord.length; i++) {
        const letter = guessWord[i].toLowerCase()
        let color 
		switch(true) {
			case letter == correctWord[i]: color = colors.green; break
			case correctWord.includes(letter) && !correct.includes(correctWord.indexOf(letter)): color = colors.yellow; break
			default: color = colors.gray; break
        }
        pairs.push({ color: color, letter: letter })
    }
	return pairs
}

function getWords(guessedWords, correctWord) {
    guessedWords = guessedWords.map(word => wordHint(word, correctWord))
    const obj = Array(5).fill({ color: 'transparent', letter: '_', hidden:true }).map(x => ({ ...x }))
    while (guessedWords.length < 6) guessedWords.push(obj)
    return guessedWords
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
        console.log
        if (result.ok) {
            const game = await result.json()
            const copy = { ...game }
            copy.guessedWords = getWords(copy.guessedWords, copy.word)
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
    
        const result = await fetch(baseURL + '/play/' + req.params.gameId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ guess:guess })
        })

        const json = await result.json()
        if (result.ok) {
            const copy = { ...json }
            copy.guessedWords = getWords(copy.guessedWords, copy.word)
            rsp.render('layout', copy)

        } else {
            rsp.status(500).json({ error: result.statusText })
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
