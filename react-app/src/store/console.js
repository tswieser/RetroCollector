const Get_CONSOLES = "consoles/GET_CONSOLES"
const POST_CONSOLES = "consoles/POST_CONSOLES"
const PUT_CONSOLES = 'consoles/PUT_CONSOLES'
const DELETE_CONSOLES = 'consoles/DELETE_CONSOLES'


const loadConsoles = (consoles) => ({
    type: Get_CONSOLES,
    consoles
})

const createConsole = (console) => ({
    type: POST_CONSOLES,
    console
})

const editConsoles = (console) => ({
    type: PUT_CONSOLES,
    console

})

const removeConsole = (id) => ({
    type: DELETE_CONSOLES,
    id
})



export const getConsoles = (id) => async (dispatch) => {
    const res = await fetch(`/api/collections/${id}/consoles`)
    const consoles = await res.json()
    if (res.ok) {
        dispatch(loadConsoles(consoles))
        return consoles
    }
}

export const postConsoles = (id, console) => async (dispatch) => {
    const res = await fetch(`/api/collections/${id}/consoles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(console)
    })
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data
        }
        dispatch(createConsole(data))
        return data
    }
}

export const putConsole = (id, console) => async (dispatch) => {
    const res = await fetch(`/api/consoles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(console)
    })
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data
        }
        dispatch(editConsoles(data))
        return data;
    }
}

export const deleteConsole = (id) => async (dispatch) => {
    const res = await fetch(`/api/consoles/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(removeConsole(id))
        return data
    }
}



const initialState = {}

const consolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Get_CONSOLES:
            const allConsoles = {}
            action.consoles.consoles.forEach((console) => {
                allConsoles[console.id] = console
            })
            return allConsoles
        case POST_CONSOLES:
            return {
                ...state,
                [action.console.id]: action.console
            }
        case PUT_CONSOLES:
            return {
                ...state,
                [action.console.id]: action.console
            }
        case DELETE_CONSOLES:
            const collObj = { ...state };
            delete collObj[action.id];
            return collObj;
        default:
            return state;

    }
}

export default consolesReducer
