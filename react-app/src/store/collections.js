const GET_COLLECTIONS = 'collections/GET_COLLECTIONS'
const POST_COLLECTION = 'collections/POST_COLLECTION'
const PUT_COLLECTION = 'collections/PUT_COLLECTION'
const DELETE_COLLECTION = 'collections/DELETE_COLLECTION'

const loadCollections = (collections) => ({
    type: GET_COLLECTIONS,
    collections
})

const createCollection = (collection) => ({
    type: POST_COLLECTION,
    collection
})

const editCollection = (collection) => ({
    type: PUT_COLLECTION,
    collection

})

const removeCollection = (id) => ({
    type: DELETE_COLLECTION,
    id
})


//thunks
export const getCollections = () => async (dispatch) => {
    const res = await fetch('/api/collections');
    const collections = await res.json()
    if (res.ok) {
        dispatch(loadCollections(collections))
    }
}

export const postCollection = (collection) => async (dispatch) => {
    const res = await fetch('/api/collections', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collection)
    });
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data
        }
        dispatch(createCollection(data))
        return data;
    }
};

export const putCollection = (id, collection) => async (dispatch) => {
    const res = await fetch(`/api/collections/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collection)
    })
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data
        }
        dispatch(editCollection(data))
        return data;
    }
}

export const deleteCollection = (id) => async (dispatch) => {
    const res = await fetch(`/api/collections/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(removeCollection(id))
        return data
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
        case POST_COLLECTION:
            return {
                ...state,
                [action.collection.id]: action.collection
            }
        case PUT_COLLECTION:
            return {
                ...state,
                [action.collection.id]: action.collection
            }
        case DELETE_COLLECTION:
            const collObj = { ...state };
            delete collObj[action.id];
            return collObj;
        default:
            return state;

    }
}

export default collectionsReducer
