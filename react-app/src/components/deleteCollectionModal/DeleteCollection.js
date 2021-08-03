import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCollection } from '../../store/collections'
import './deleteCollection.css'

function DeleteCollection({ setShowModal, collection }) {
    const dispatch = useDispatch();

    function handleDelete(e) {
        e.preventDefault()
        dispatch(deleteCollection(collection.id))
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
                <h1 className='delete_form_title'>{collection.name} will be deleted </h1>
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
export default DeleteCollection
