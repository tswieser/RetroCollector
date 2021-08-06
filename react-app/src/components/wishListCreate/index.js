import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateWish from "./createWishModal";
import './wishList.css'

function WishModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="add_game_container" onClick={() => setShowModal(true)}>
                <div className="plus_button">
                    <i class="fas fa-plus fa-2x"></i>
                </div>
                <div className="add_game">
                    Add Game to WishList
                </div>
            </div >
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateWish setShowModal={setShowModal} />
                    </Modal>
                )
            }
        </>
    );
}

export default WishModal;
