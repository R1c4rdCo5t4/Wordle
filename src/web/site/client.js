
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
		console.log(`word-${idx}`)
		const typingWord = document.getElementById(`word-${idx}`)

		
		
		document.addEventListener('keydown', (event) => {
		
			if (event.key === 'Enter') {
				guessWord.value = word
				document.getElementById('onPlayButton').click()
				return
			}
			
			if (event.key === 'Backspace') {
				word = word.slice(0, word.length - 1)
				let i
				for (i = 0; i < word.length; i++) {
					typingWord.children[i].textContent = word[i].toUpperCase()
				}
				while (i < 5) typingWord.children[i++].textContent = '_'
				return
			}

			const letter = event.key.toLowerCase()
			if (letter.length == 1 && letter >= 'a' && letter <= 'z' && letter != ' ' && word.length < 5 && !isOver) {
				word += letter			
				for (let i = 0; i < word.length; i++) {
					typingWord.children[i].textContent = word[i].toUpperCase()
				}
			}
		})
	})
}