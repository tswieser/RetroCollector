import React, { useState } from 'react'
import ReactStars from 'react-stars'
import { useDispatch, useSelector } from 'react-redux'
import { putGames } from '../../store/game'
import { putReviews, postReviews } from '../../store/review'
import './editGame.css'

function EditGame({ setShowModal, game }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(game.title)
    const [value, setValue] = useState(game.value)
    const [genre, setGenre] = useState(game.genre)
    const [release_date, setReleaseDate] = useState(game.release_date)
    const [errors, setErrors] = useState('')

    const reviews = useSelector((state) => Object.values(state.reviews))
    const review = reviews.find((review) => review?.game_id === game.id)
    const [rating, setRating] = useState(review?.rating)

    async function handleSubmit(e) {
        e.preventDefault()
        const newGame = {
            title,
            value,
            genre,
            release_date
        }
        const updatedReview = { rating: rating }

        const data = await dispatch(putGames(game.id, newGame))

        if (!review?.rating) {
            dispatch(postReviews(data.id, updatedReview))
        } else {
            dispatch(putReviews(data.id, updatedReview))
        }

        if (data.errors) {
            setErrors(data.errors);
            return
        }
        setShowModal(false);
    }

    return (

        <div className="form_container">
            <form onSubmit={handleSubmit}>
                <div className="title_container">
                    <h1 className='edit_game_form_title'>Edit A Game</h1>
                </div>
                <ul className="form_error_container">
                    {errors &&
                        errors.map((error, i) => (
                            <li className="errors" key={i}>
                                {error}
                            </li>
                        ))}
                </ul>
                <div className="form_label_container">
                    <label htmlFor="name" className="form_labels">
                        Title
                    </label>
                </div>
                <div>
                    <input id="name" className="game_input_name" name="name" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form_label_container">
                    <label htmlFor="name" className="form_labels">
                        Genre
                    </label>
                </div>
                <div>
                    <input id="genre" className="game_input_name" name="genre" type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </div>
                <div className="form_label_container">
                    <label htmlFor="name" className="form_labels">
                        Value
                    </label>
                </div>
                <div>
                    <input id="value" className="game_input_name" name="value" type="number" value={`${value}`} onChange={(e) => setValue(e.target.value)} />
                </div>
                <div className="form_label_container">
                    <label htmlFor="name" className="form_labels">
                        Release Date
                    </label>
                </div>
                <div>
                    <input placeholder="Optional" id="release_date" className="game_input_name" name="release_date" type="text" value={release_date} onChange={(e) => setReleaseDate(e.target.value)} />
                </div>
                <div className="rating_container">
                    <ReactStars
                        count={5}
                        size={38}
                        half={false}
                        value={rating}
                        onChange={setRating}
                        color1={'#f1f1f1'}
                        color2={'rgb(131, 128, 128)'}
                    />
                </div>
                <div className="game_button_container">
                    <button className="form_edit_button_game" type="submit">
                        Edit Game
                    </button>
                </div>

            </form>

        </div>
    )
}
export default EditGame
