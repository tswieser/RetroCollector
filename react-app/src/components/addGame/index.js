import React, { useEffect } from 'react'
import GameModal from '../createGameModal'
import { useSelector, useDispatch } from "react-redux";
import { getGames } from "../../store/game"
import DeleteGameModal from '../deleteGameModal'
import EditGameModal from '../editGameModal'
import "./addGame.css"




const AddGames = ({ consoleInfo }) => {
    const dispatch = useDispatch()

    const games = useSelector((state) => Object.values(state.games))
    const gamesArr = []

    games.forEach((game) => {
        if (game.console_id === consoleInfo.id) {
            gamesArr.push(game)
        }
    })



    useEffect(() => {
        dispatch(getGames(consoleInfo.id))
    }, [dispatch])

    return (
        <>
            <div>
                {gamesArr.map((game) => (
                    <div className="gameInfo_container">
                        <div>
                            {game.title}
                        </div>
                        <div>
                            {`$${game.value}`}
                        </div>
                        <div>
                            {game.genre}
                        </div>
                        <div>
                            {game.release_date}
                        </div>
                        <div>
                            {consoleInfo.name}
                        </div>
                        <div>
                            <EditGameModal game={game} />
                        </div>
                        <div>
                            <DeleteGameModal game={game} />
                        </div>
                    </div>
                ))}

            </div>
            <div>
                <GameModal consoleInfo={consoleInfo} />
            </div>
        </>
    )
}

export default AddGames
