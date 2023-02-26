
const baseURL = 'http://localhost:8080'
let word = ''

async function onPlay(gameId) {
	const guessWord = document.getElementById('guessWord').value

	try {
		const response = await fetch(baseURL + '/play/' + gameId, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ guess: guessWord })
		})

		location.reload()
		
	}
	catch (err) {
		alert("Failed to make play: " + err)
	}

}

function writeWord(guesses, isOver) {
	const idx = 6 - guesses
	const guessWord = document.getElementById('guessWord')

	document.addEventListener('DOMContentLoaded', () => {
		const typingWord = document.getElementById(`word-${idx}`)
		
		document.addEventListener('keydown', (event) => {
			const tile = typingWord.children[word.length]

			switch (event.key) {
				case 'Enter':
					guessWord.value = word
					document.getElementById('onPlayButton').click()
					break
				
				case 'Backspace':
					if (word.length <= 0) break
					
					const prev = typingWord.children[word.length - 1]
					if (prev.textContent == '_') prev.style.background = 'transparent'
					else prev.textContent = '_'

					word = word.slice(0, word.length - 1)
					break

				case ' ':
					if (word.length >= 5) break
					word += '_'
					tile.textContent = '_'
					tile.style.background = '#dcdcdc8f'
					break
				
				default:
					const letter = event.key.toLowerCase()
					if (letter.length == 1 && letter >= 'a' && letter <= 'z' && letter != ' ' && word.length < 5 && !isOver) {
						word += letter
						tile.textContent = letter
					}
			}
		})
	})
}