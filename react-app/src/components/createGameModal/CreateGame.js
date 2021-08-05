import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { priceFinder } from '../../store/game'
import { postGames } from '../../store/game'
import { postReviews } from '../../store/review'
import ReactStars from 'react-stars'


function CreateGame({ setShowModal, consoleInfo }) {
    const dispatch = useDispatch()
    const [gameSearch, setGameSearch] = useState("")
    const [title, setTitle] = useState('')
    const [CibValue, setCibValue] = useState('')
    const [LooseValue, setLooseValue] = useState('')
    const [value, setValue] = useState(CibValue)
    const [genre, setGenre] = useState('')
    const [release_date, setReleaseDate] = useState('')
    const [errors, setErrors] = useState('')
    const [condition, setCondition] = useState("")
    const [rating, setRating] = useState()


    const searchedGame = useSelector(state => state.games.search)
    const games = useSelector(state => Object.values(state.games))



    useEffect(() => {
        if (games.length) {
            if (condition === "CIB" && games[games.length - 1]["console-name"]) {
                let newVal = searchedGame['cib-price']
                let formatNum = (newVal / 100).toFixed(2)
                setValue(formatNum)
            } else if (condition === "loose" && games[games.length - 1]["console-name"]) {
                let newVal = searchedGame['loose-price']
                let formatNum = (newVal / 100).toFixed(2)
                setValue(formatNum)
            }
        }
    }, [CibValue, condition]);


    const onSearch = async (e) => {
        e.preventDefault()
        const gameData = await dispatch(priceFinder(gameSearch))

        if (gameData.id) {
            setTitle(gameData['product-name'])
            setGenre(gameData['genre'])
            setCibValue(gameData['cib-price'])
            setLooseValue(gameData['loose-price'])
            setReleaseDate(gameData['release-date'])

        } else {
            setErrors([gameData])
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const newGame = {
            title,
            collection_id: consoleInfo.collection_id,
            value,
            genre,
            release_date
        }
        const review = { rating: rating }
        const data = await dispatch(postGames(consoleInfo.id, newGame))
        dispatch(postReviews(data.id, review))
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
                            Genre
                        </label>
                    </div>
                    <div>
                        <input id="genre" className="game_input_name" name="genre" type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
                    </div>
                    <div className="radio_buttons">
                        <div>
                            Loose<input type="checkbox" value="loose" checked={condition === "loose"}
                                onChange={(e) => { setCondition(e.target.value) }}
                            >
                            </input>
                        </div>
                        <div className="cib_button">
                            CIB<input className="checkbox_button" type="checkbox" value="CIB" checked={condition === "CIB"}
                                onChange={(e) => { setCondition(e.target.value) }}
                            >
                            </input>
                        </div>

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
                            half={false}
                            size={38}
                            value={rating}
                            onChange={setRating}
                            color1={'#f1f1f1'}
                            color2={'rgb(131, 128, 128)'}
                        />
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
export default CreateGame
