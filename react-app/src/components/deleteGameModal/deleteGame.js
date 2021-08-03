import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteGame } from '../../store/game'
import "./deleteGame.css"

function DeleteGame({ setShowModal, game }) {
    const dispatch = useDispatch();

    function handleDelete(e) {
        e.preventDefault()
        dispatch(deleteGame(game.id))
        setShowModal(false);
    }

    function handleCancel(e) {
        e.preventDefault()
        setShowModal(false)
    }

    return (
        <div className="delete_form_container">
            <div className="delete_title_container_div">
                <div>
                    <h1 className='delete_form_title'>Are You Sure?</h1>
                </div>
                <div>
                    <h1 className='delete_form_title'>{game.title}</h1>
                </div>
                <div>
                    <h1 className='delete_form_title'> will be deleted</h1>
                </div>
            </div>
            <div className='game_delete_button_container'>
                <button className="game_delete_form_button" onClick={handleDelete} >
                    Delete
                </button>
                <button className="game_delete_form_button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div >

    )

}
export default DeleteGame
