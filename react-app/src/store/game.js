









export const priceFinder = (game) => async (dispatch) => {
    const res = await fetch(`https://www.pricecharting.com/api/product?t=d6535b45236fa09eb29fbe82cfbfc96097246f08&q=${game}`);
    if (res.ok) {
        const game = await res.json()
        return game
    } else {
        return "Game not Found"
    }
}
