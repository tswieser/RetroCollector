const GET_COLLECTIONS = 'collections/GET_COLLECTIONS'

const loadCollections = (collections) => ({
    type: GET_COLLECTIONS,
    collections
})



//thunks
export const getCollections = () => async (dispatch) => {
    const res = await fetch('/api/collections');
    const collections = await res.json()
    if (res.ok) {
        dispatch(loadCollections)
    }

}


//reducer
const initialState = {}

const collectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COLLECTIONS:
            const allCollections = {}
            action.collections.collections.forEach((collection) => {
                allCollections[collection.id] = collection
            })
            return allCollections
        default:
            return state;

    }
}

export default collectionsReducer
