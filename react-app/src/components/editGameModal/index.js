import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditGame from "./editGame";

function EditGameModal({ game }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <i class="fas fa-edit"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditGame game={game} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditGameModal;
