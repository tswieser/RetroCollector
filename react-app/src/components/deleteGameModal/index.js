import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteGame from "./deleteGame";

function DeleteGameModal({ game }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <i class="fas fa-trash-alt"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteGame game={game} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default DeleteGameModal;
