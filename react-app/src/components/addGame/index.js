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
                <table className="game_table">
                    <tr>
                        <th>Title</th>
                        <th>Value</th>
                        <th>Genre</th>
                        <th>Release Date</th>
                        <th>Console</th>
                        <th>Edit/ Delete</th>
                    </tr>
                    {gamesArr.map((game) => (
                        <tr>
                            <td>
                                {game.title}
                            </td>
                            <td>
                                {`$${game.value}`}
                            </td>

                            <td>
                                {game.genre}
                            </td>
                            <td>
                                {game.release_date}
                            </td>
                            <td>
                                {consoleInfo.name}
                            </td>
                            <td>
                                <div className="edit_delete_buttons">
                                    <div className="edit_game_button">
                                        <EditGameModal game={game} />
                                    </div>
                                    <div className="delete_game_button">
                                        <DeleteGameModal game={game} />
                                    </div>
                                </div>
                            </td>
                        </tr>

                    ))}
                </table>
            </div>
            <div>
                <GameModal consoleInfo={consoleInfo} />
            </div>
        </>
    )
}

export default AddGames
