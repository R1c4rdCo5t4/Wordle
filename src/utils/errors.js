
export default {
    INVALID_PARAMETER: argName => {
        return {
            code: 0,
            type: 'INVALID_PARAMETER',
            message: `Invalid parameter: ${argName}`
        }
    },
    GAME_NOT_FOUND: groupId => {
        return {
            code: 1,
            type: 'GAME_NOT_FOUND',
            message: `Game with id '${groupId}' not found`
        }
    },
    WORD_NOT_FOUND: word => {
        return {
            code: 2,
            type: 'WORD_NOT_FOUND',
            message: `Word '${word}' not found`
        }
    },
    WORD_ALREADY_GUESSED: word => {
        return {
            code: 3,
            type: 'WORD_ALREADY_GUESSED',
            message: `Word '${word}' already guessed`
        }
    }

}