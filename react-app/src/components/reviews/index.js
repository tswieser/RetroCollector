import ReactStars from 'react-stars'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import './review.css'



const Reviews = ({ game }) => {
    const reviews = useSelector((state) => Object.values(state.reviews))
    const review = reviews.find((review) => review?.game_id === game.id)
    const [rating, setRating] = useState(review?.rating)


    console.log(review)

    return (
        <div className="rating_stars">
            <ReactStars
                count={5}
                size={24}
                value={rating}
                edit={false}
            />
        </div>
    )
}

export default Reviews
