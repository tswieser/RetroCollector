import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { getCollections } from "../../store/collections";
import { getConsoles } from "../../store/console"
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

    }, [dispatch])

    const games = useSelector((state) => Object.values(state.games))




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
    console.log(valueFinder(1))

    const totalVal = (consoleVal, gamesVal) => {
        let newTotal = 0
        newTotal += consoleVal + +gamesVal
        return newTotal
    }


    const collections = useSelector((state) => Object.values(state.collections))
    const collection = collections.find((collection) => collection?.id === +id)

    const consoles = useSelector((state) => Object.values(state.consoles))

    console.log(totalVal(130, valueFinder(1)))

    return (
        <>
            <div className="games_header">
                <div className="collection_title">
                    <h1>{collection?.name} Collection</h1>
                </div>
                <div>
                    <h2>{collection?.description}</h2>
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
                                    <h2>{consoleInfo.name}</h2>
                                </div>
                                <div className="console_name">
                                    <h3>{`Console Value: $${consoleInfo.value}`}</h3>
                                </div>
                                <div className="console_name">
                                    <h3>{`All ${consoleInfo.name} Game Values: $${valueFinder(consoleInfo.id)}`}</h3>
                                </div>
                                <div className="console_name">
                                    <h3>{`Total: $${((consoleInfo.value) + +valueFinder(consoleInfo.id)).toFixed(2)}`}</h3>
                                </div>
                            </div>
                            <div className="icon_container">
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
                    <ConsoleModal id={id} />
                    <h3>Add A New Console</h3>
                </div>

            </div>


        </>

    )
}

export default GamesPage
