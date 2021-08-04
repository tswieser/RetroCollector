import ReactStars from 'react-stars'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getReviews } from '../../store/review'
import './review.css'



const Reviews = ({ game }) => {
    const dispatch = useDispatch()
    const reviews = useSelector((state) => Object.values(state.reviews))
    const review = reviews.find((review) => review?.game_id === game.id)

    return (
        <div className="rating_stars">
            <ReactStars
                count={5}
                size={24}
                value={review?.rating}
                edit={false}
                color2={'white'}
            />
        </div>
    )
}

export default Reviews
