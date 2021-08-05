import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { putWishlists } from '../../store/wishlist'



function EditWish({ setShowModal, wish }) {
    const dispatch = useDispatch()

    const [title, setTitle] = useState(wish.title)
    const [CibValue, setCibValue] = useState(wish.cib_value)
    const [LooseValue, setLooseValue] = useState(wish.loose_value)
    const [consoleInfo, setConsole] = useState(wish.consoleName)
    const [genre, setGenre] = useState(wish.genre)
    const [release_date, setReleaseDate] = useState(wish.release_date)
    const [errors, setErrors] = useState('')



    async function handleSubmit(e) {
        e.preventDefault()
        const updatedWish = {
            title,
            consoleName: consoleInfo,
            cib_value: CibValue,
            loose_value: LooseValue ,
            genre,
            release_date
        }

        const data = await dispatch(putWishlists(wish.id, updatedWish))
        if (data.errors) {
            setErrors(data.errors);
            return
        }
        setShowModal(false);
    }


    return (
        <div className="game_container_modal">
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
            <div className="game_form_container">
                <form onSubmit={handleSubmit}>

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
                            Console
                        </label>
                    </div>
                    <div>
                        <input id="console" className="game_input_name" name="console" type="text" value={consoleInfo} onChange={(e) => setConsole(e.target.value)} />
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
                            Cib Value
                        </label>
                    </div>
                    <div>
                        <input id="cib_value" className="game_input_name" name="cib_value" type="number" value={`${CibValue}`} onChange={(e) => setCibValue(e.target.value)} />
                    </div>

                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Loose Value
                        </label>
                    </div>
                    <div>
                        <input id="LooseValue" className="game_input_name" name="LooseValue" type="number" value={`${LooseValue}`} onChange={(e) => setLooseValue(e.target.value)} />
                    </div>
                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Release Date
                        </label>
                    </div>
                    <div>
                        <input placeholder="Optional" id="release_date" className="game_input_name" name="release_date" type="text" value={release_date} onChange={(e) => setReleaseDate(e.target.value)} />
                    </div>
                    <div className="button_container">
                        <button className="game_form_button" type="submit">
                        Edit Game
                        </button>
                    </div>

                </form>

            </div>

        </div>
    )

}
export default EditWish
