
export default {
    INVALID_PARAMETER: name => {
        return {
            status: 400,
            message: `Invalid parameter: ${name}`
        }
    },
    NOT_FOUND: id => {
        return {
            status: 404,
            message: `Game with id '${id}' not found`
        }
    }
}
