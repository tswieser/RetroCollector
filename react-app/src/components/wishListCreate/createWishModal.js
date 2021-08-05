import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { priceFinder } from '../../store/game'
import { postWishlists } from '../../store/wishlist'



function CreateWish({ setShowModal }) {
    const dispatch = useDispatch()
    const [gameSearch, setGameSearch] = useState("")
    const [title, setTitle] = useState('')
    const [CibValue, setCibValue] = useState('')
    const [LooseValue, setLooseValue] = useState('')
    const [consoleInfo, setConsole] = useState('')
    const [genre, setGenre] = useState('')
    const [release_date, setReleaseDate] = useState('')
    const [errors, setErrors] = useState('')




    const onSearch = async (e) => {
        e.preventDefault()
        const gameData = await dispatch(priceFinder(gameSearch))

        if (gameData.id) {
            setTitle(gameData['product-name'])
            setGenre(gameData['genre'])
            setCibValue(gameData['cib-price'])
            setLooseValue(gameData['loose-price'])
            setReleaseDate(gameData['release-date'])
            setConsole(gameData['console-name'])
        } else {
            setErrors([gameData])
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const wish = {
            title,
            consoleName: consoleInfo,
            cib_value: (CibValue / 100).toFixed(2),
            loose_value: (LooseValue / 100).toFixed(2),
            genre,
            release_date
        }

        const data = await dispatch(postWishlists(wish))
        if (data.errors) {
            setErrors(data.errors);
            return
        }
        setShowModal(false);
    }


    return (
        <div className="game_container_modal">
            <div className="title_container">
                <h1 className='edit_game_form_title'>Add A Game</h1>
            </div>
            <ul className="form_error_container">
                {errors &&
                    errors.map((error, i) => (
                        <li className="errors" key={i}>
                            {error}
                        </li>
                    ))}
            </ul>
            <div className="search_container">
                <form onSubmit={onSearch}>
                    <input
                        placeholder='Quick Search'
                        onKeyUp={(e) => setGameSearch(e.target.value)}
                        className="search_field"
                    >
                    </input>
                    <button className="search_button">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
            </div>
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
                        <input id="cib_value" className="game_input_name" name="cib_value" type="number" value={`${(CibValue / 100).toFixed(2)}`} onChange={(e) => setCibValue(e.target.value)} />
                    </div>

                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Loose Value
                        </label>
                    </div>
                    <div>
                        <input id="LooseValue" className="game_input_name" name="LooseValue" type="number" value={`${(LooseValue / 100).toFixed(2)}`} onChange={(e) => setLooseValue(e.target.value)} />
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
                            Add Game
                        </button>
                    </div>

                </form>

            </div>

        </div>
    )

}
export default CreateWish
