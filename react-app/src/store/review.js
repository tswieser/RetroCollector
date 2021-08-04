const GET_REVIEWS = 'reviews/GET_REVIEWS'
const POST_REVIEWS = "reviews/POST_REVIEWS"
const PUT_REVIEWS = 'reviews/PUT_REVIEWS'


const loadReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const createReview = (review) => ({
    type: POST_REVIEWS,
    review
})

const editReview = (review) => ({
    type: PUT_REVIEWS,
    review
})


export const getReviews = () => async (dispatch) => {
    const res = await fetch(`/api/games/review`)
    const reviews = await res.json()
    if (res.ok) {
        dispatch(loadReviews(reviews))
        return reviews
    }
}

export const postReviews = (id, review) => async (dispatch) => {
    const res = await fetch(`/api/games/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data
        }
        dispatch(createReview(data))
        return data
    }
}

export const putReviews = (id, review) => async (dispatch) => {
    const res = await fetch(`/api/games/${id}/review`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data
        }
        dispatch(editReview(data))
        return data
    }
}


const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            const allReviews = {}
            action.reviews.reviews.forEach((review) => {
                allReviews[review.id] = review
            })
            return allReviews
        case POST_REVIEWS:
            return {
                ...state,
                [action.review.id]: action.review
            }
        case PUT_REVIEWS:
            return {
                ...state,
                [action.review.id]: action.review
            }
        default:
            return state;
    }
}

export default reviewsReducer
