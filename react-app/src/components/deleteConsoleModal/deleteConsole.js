import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteConsole } from '../../store/console'

function DeleteConsole({ setShowModal, consoleInfo }) {
    const dispatch = useDispatch();

    function handleDelete(e) {
        e.preventDefault()
        dispatch(deleteConsole(consoleInfo.id))
        setShowModal(false);
    }

    function handleCancel(e) {
        e.preventDefault()
        setShowModal(false)
    }

    return (
        <div className="delete_form_container">
            <div className="delete_title_container">
                <h1 className='delete_form_title'>Are You Sure?</h1>
                <h1 className='delete_form_title'>{consoleInfo.name} will be deleted </h1>
            </div>
            <div className='button_container'>
                <button className="delete_form_button" onClick={handleDelete} >
                    Delete
                </button>
                <button className="delete_form_button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div >

    )

}
export default DeleteConsole
