import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { priceFinder } from '../../store/game'


function CreateGame({ setShowModal }) {
    const dispatch = useDispatch()
    const [gameSearch, setGameSearch] = useState("")
    const [title, setTitle] = useState('')
    const [CibValue, setCibValue] = useState('')
    const [LooseValue, setLooseValue] = useState('')
    const [value, setValue] = useState(CibValue)
    const [genre, setGenre] = useState('')
    const [release_date, setReleaseDate] = useState('')
    const [display, setDisplay] = useState('')
    const [errors, setErrors] = useState('')
    const [condition, setCondition] = useState("")
    console.log(value)


    const searchedGame = useSelector(state => state.games.search)
    const games = useSelector(state => Object.values(state.games))
    const addDecimal = (num) => (num / 100).toFixed

    useEffect(() => {
        if (games.length) {
            if (condition === "CIB") {
                let newVal = searchedGame['cib-price']
                let formatNum = (newVal / 100).toFixed(2)
                setDisplay(formatNum)
            } else if (condition === "loose") {
                let newVal = searchedGame['loose-price']
                let formatNum = (newVal / 100).toFixed(2)
                setDisplay(formatNum)
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
            console_id: console.id,
            value: CibValue,
            genre,
            release_date
        }
        const data = await dispatch()
        if (data.errors) {
            setErrors(data.errors);
            return
        }
        setShowModal(false);
    }


    return (
        <div>
            <div className="search_container">
                <form onSubmit={onSearch}>
                    <input
                        placeholder='Search item'
                        onKeyUp={(e) => setGameSearch(e.target.value)}
                    >
                    </input>
                    <button>
                        Search
                    </button>
                </form>
            </div>
            <div className="form_container">
                <form onSubmit={handleSubmit}>
                    <div className="title_container">
                        <h1 className='form_title'>Add A Game</h1>
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
                    <div className="radio_buttons">
                        Loose<input type="radio" value="loose" checked={condition === "loose"}
                            onChange={(e) => { setCondition(e.target.value) }}
                        >
                        </input>
                        CIB<input type="radio" value="CIB" checked={condition === "CIB"}
                            onChange={(e) => { setCondition(e.target.value) }}
                        >
                        </input>

                    </div>
                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Value
                        </label>
                    </div>
                    <div>
                        <input id="value" className="collection_description" name="value" type="number" value={`${value ? value : display}`} onChange={(e) => setValue(e.target.value)} />
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
                            Add Game
                        </button>
                    </div>

                </form>

            </div>

        </div>
    )

}
export default CreateGame
