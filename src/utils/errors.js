
export default {
    INVALID_PARAMETER: argName => {
        return {
            code: 0,
            message: `Invalid parameter: ${argName}`
        }
    },
    GAME_NOT_FOUND: groupId => {
        return {
            code: 1,
            message: `Game with id '${groupId}' not found`
        }
    }
}