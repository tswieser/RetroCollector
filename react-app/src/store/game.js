const FIND_GAMES = "games/FIND_GAMES"


const loadGame = (game) => ({
    type: FIND_GAMES,
    game
})






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


const initialState = {}

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_GAMES:
            const allGames = { ...state }
            allGames["search"] = action.game
            return allGames
        default:
            return state;

    }
}
export default gamesReducer
