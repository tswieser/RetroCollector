const GET_WISHLIST = 'wishlist/GET_WISHLIST'
const POST_WISHLIST = 'wishlist/POST_WISH'
const PUT_WISHLIST = 'wishlist/PUT_WISHLIST'
const DELETE_WISHLIST = 'wishlist/DELETE_WISHLIST'

const loadWishList = (wishlists) => ({
    type: GET_WISHLIST,
    wishlists
})

const CreateWishList = (wish) => ({
    type: POST_WISHLIST,
    wish
})

const EditWishList = (wish) => ({
    type: PUT_WISHLIST,
    wish
})

const DeleteWishList = (id) => ({
    type: DELETE_WISHLIST,
    id
})


export const getWishlists = () => async (dispatch) => {
    const res = await fetch('/api/wishlists');
    const wishlists = await res.json()
    if (res.ok) {
        dispatch(loadWishList(wishlists))
    }
}


export const postWishlists = (wish) => async (dispatch) => {
    const res = await fetch('/api/wishlists', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wish)
    });
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data
        }
        dispatch(CreateWishList(data))
        return data;
    }
}

export const putWishlists = (id, wish) => async (dispatch) => {
    const res = await fetch(`/api/wishlists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wish)
    })
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data
        }
        dispatch(EditWishList(data))
        return data;
    }
}

export const deleteWish = (id) => async (dispatch) => {
    const res = await fetch(`/api/wishlists/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(DeleteWishList(id))
        return data
    }
}

const initialState = {}

const wishListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WISHLIST:
            const allWishLists = {}
            action.wishlists.wishlists.forEach((wish) => {
                allWishLists[wish.id] = wish
            })
            return allWishLists
        case POST_WISHLIST:
            return {
                ...state,
                [action.wish.id]: action.wish
            }
        case PUT_WISHLIST:
            return {
                ...state,
                [action.wish.id]: action.wish
            }
        case DELETE_WISHLIST:
            const wishObj = { ...state };
            delete wishObj[action.id];
            return wishObj;
        default:
            return state;
    }

}
export default wishListReducer;
