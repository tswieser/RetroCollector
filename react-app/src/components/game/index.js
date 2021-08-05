import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { getCollections } from "../../store/collections";
import { getConsoles } from "../../store/console"
import { getReviews } from '../../store/review'
import ConsoleModal from '../createConsoleModal'
import EditConsoleModal from '../editConsoleModal'
import DeleteConsoleModal from "../deleteConsoleModal";
import AddGames from '../addGame'
import "./game.css"


const GamesPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCollections())
        dispatch(getConsoles(id))
        dispatch(getReviews())

    }, [dispatch])

    const games = useSelector((state) => Object.values(state.games))
    const collectionGames = games.filter((game) => game?.collection_id === +id)
    const collections = useSelector((state) => Object.values(state.collections))

    const collection = collections.find((collection) => collection?.id === +id)

    const consoles = useSelector((state) => Object.values(state.consoles))
    const collectionConsoles = consoles.filter((console) => console?.collection_id == +id)



    const collectionValue = (consoles, games) => {
        let value = 0
        consoles.forEach((console) => {
            value += console.value
        })
        games.forEach((game) => {
            value += game.value
        })
        return value.toFixed(2)
    }

  

    const valueFinder = (consoleId) => {
        let counter = 0
        for (let i = 0; i < games.length; i++) {
            let game = games[i]
            if (game.console_id === consoleId) {
                counter += game.value
            }
        }
        return counter.toFixed(2)
    }



    return (
        <>
            <div className="games_header">
                <div className="collection_title">
                    <h1>{collection?.name} Collection</h1>
                </div>
                <div className="collection_title">
                    <h3>{collection?.description}</h3>
                </div>
                <div className="collection_title">
                    <h3>Total Collection Value: ${collectionValue(collectionConsoles, collectionGames)}</h3>
                </div>
            </div>
            <div className="cards_container">
                {consoles.map((consoleInfo) => (
                    <div className='console_card'>
                        <div className="cardHeader">
                            <div className="imgContainer" >
                                <img className="console_img" src={consoleInfo.console_img_url} />
                            </div>
                            <div className="console_info">
                                <div className="console_name">
                                    <h2 className="consoleInfo_name">{consoleInfo.name}</h2>
                                </div>
                                <div className="console_value">
                                    {`Console Value: $${consoleInfo.value}`}
                                </div>
                                <div className="console_value">
                                    {`All ${consoleInfo.name} Game Values: $${valueFinder(consoleInfo.id)}`}
                                </div>
                                <div className="console_value" >
                                    {`Total: $${((consoleInfo.value) + +valueFinder(consoleInfo.id)).toFixed(2)}`}
                                </div>
                            </div>
                            <div className="console_icon_container">
                                <div className="edit_container">
                                    <EditConsoleModal consoleInfo={consoleInfo} />
                                </div>
                                <div className="delete_container">
                                    <DeleteConsoleModal consoleInfo={consoleInfo} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <AddGames consoleInfo={consoleInfo} />
                        </div>
                    </div>
                ))}

                <div className='console_card'>
                    <div className="console_plus">
                        <div className="console_plus_button">
                            <ConsoleModal id={id} />
                        </div>
                        <div>
                            <h3>Add A New Console</h3>
                        </div>
                    </div>
                </div>

            </div>


        </>

    )
}

export default GamesPage
