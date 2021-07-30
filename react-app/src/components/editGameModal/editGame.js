import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { putGames } from '../../store/game'


function EditGame({ setShowModal, game }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(game.title)
    const [value, setValue] = useState(game.value)
    const [genre, setGenre] = useState(game.genre)
    const [release_date, setReleaseDate] = useState(game.release_date)
    const [errors, setErrors] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        const newGame = {
            title,
            value,
            genre,
            release_date
        }
        const data = await dispatch(putGames(game.id, newGame))
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
                    <h1 className='form_title'>Edit A Game</h1>
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
                    <input id="name" className="collection_name" name="name" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form_label_container">
                    <label htmlFor="name" className="form_labels">
                        Genre
                    </label>
                </div>
                <div>
                    <input id="genre" className="collection_imgUrl" name="genre" type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </div>
                <div className="form_label_container">
                    <label htmlFor="name" className="form_labels">
                        Value
                    </label>
                </div>
                <div>
                    <input id="value" className="collection_description" name="value" type="number" value={`${value}`} onChange={(e) => setValue(e.target.value)} />
                </div>
                <div className="form_label_container">
                    <label htmlFor="name" className="form_labels">
                        Release Date
                    </label>
                </div>
                <div>
                    <input placeholder="Optional" id="release_date" className="collection_description" name="release_date" type="text" value={release_date} onChange={(e) => setReleaseDate(e.target.value)} />
                </div>
                <div className="button_container">
                    <button className="form_button" type="submit">
                        Edit Game
                    </button>
                </div>

            </form>

        </div>
    )
}
export default EditGame
