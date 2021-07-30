import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteGame } from '../../store/game'

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
        <div className="delete_container">
            <div className="title_container">
                <h1 className='form_title'>Are You Sure?</h1>
                <h1>{game.name} will be deleted </h1>
            </div>
            <button className="form_button" onClick={handleDelete} >
                Delete
            </button>
            <button className="form_button" onClick={handleCancel}>
                Cancel
            </button>
        </div >

    )

}
export default DeleteGame
