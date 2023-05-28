
export async function fetchAPI(url, options) {
    const response = await fetch('http://localhost:8080/api' + url, options)
    const json = await response.json()
    if (!response.ok) {
        throw new Error(json)
    }
    return json
}

async function newGame() {
    return await fetchAPI(`/games`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function getGame(id) {
    require(id, 'id is required')
    return await fetchAPI(`/games`)
}

async function updateGame(id, guess) {
    require(id, 'id is required')
    require(guess, 'guess is required')
    return await fetchAPI(`/games/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({guess})
    })
}

function require(value, message) {
    if (value === undefined || value === "" || value === false) {
        alert(message)
        throw new Error(message)
    }
}

export default { newGame, getGame, updateGame }
