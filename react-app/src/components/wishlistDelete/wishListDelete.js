import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteWish } from '../../store/wishlist'


function DeleteWish({ setShowModal, wish }) {
    const dispatch = useDispatch();

    function handleDelete(e) {
        e.preventDefault()
        dispatch(deleteWish(wish.id))
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
                    <h1 className='delete_form_title'>{wish.title}</h1>
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
export default DeleteWish
