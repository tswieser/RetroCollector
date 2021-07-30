const FIND_GAMES = "games/FIND_GAMES"
const GET_GAMES = 'games/GET_GAMES'
const POST_GAMES = 'games/POST_GAMES'
const PUT_GAMES = 'games/PUT_GAMES'
const DELETE_GAMES = 'games/DELETE_GAMES'


const loadGame = (game) => ({
    type: FIND_GAMES,
    game
})

const loadAllGames = (games) => ({
    type: GET_GAMES,
    games
})

const createGame = (game) => ({
    type: POST_GAMES,
    game
})

const editGame = (game) => ({
    type: PUT_GAMES,
    game
})

const removeGame = (id) => ({
    type: DELETE_GAMES,
    id
})


//Api Call for Price Charting
export const priceFinder = (game) => async (dispatch) => {
    const res = await fetch(`https://www.pricecharting.com/api/product?t=d6535b45236fa09eb29fbe82cfbfc96097246f08&q=${game}`);
    if (res.ok) {
        const game = await res.json()
        // console.log(game)
        dispatch(loadGame(game))
        return game
    } else {
        return "Game not Found"
    }
}


export const getGames = (id) => async (dispatch) => {
    const res = await fetch(`/api/consoles/${id}/games`)
    const games = await res.json()
    if (res.ok) {

        dispatch(loadAllGames(games))
        return games
    }
}

export const postGames = (id, game) => async (dispatch) => {
    const res = await fetch(`/api/consoles/${id}/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game)
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data
        }
        dispatch(createGame(data))
        return data
    }
}

export const putGames = (id, game) => async (dispatch) => {
    const res = await fetch(`/api/games/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game)
    })
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data
        }
        dispatch(editGame(data))
        return data;
    }
}

export const deleteGame = (id) => async (dispatch) => {
    const res = await fetch(`/api/games/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(removeGame(id))
        return data
    }
}

const initialState = {}

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_GAMES:
            const allGames = { ...state }
            allGames["search"] = action.game
            return allGames
        case GET_GAMES:
            const allGamesObj = { ...state }
            action.games.games.forEach((game) => {
                allGamesObj[game.id] = game
            })
            return allGamesObj
        case POST_GAMES:
            return {
                ...state,
                [action.game.id]: action.game
            }
        case PUT_GAMES:
            return {
                ...state,
                [action.game.id]: action.game
            }
        case DELETE_GAMES:
            const gameObj = { ...state };
            delete gameObj[action.id];
            return gameObj;
        default:
            return state;

    }
}
export default gamesReducer
