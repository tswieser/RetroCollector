import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateGame from "./CreateGame";


function GameModal({ consoleInfo }) {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <i class="fas fa-plus fa-2x"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateGame setShowModal={setShowModal} consoleInfo={consoleInfo} />
                </Modal>
            )}
        </>
    );
}

export default GameModal;
