import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateGame from "./CreateGame";
import "./createGame.css"

function GameModal({ consoleInfo }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="add_game_container" onClick={() => setShowModal(true)}>
                <div className="plus_button">
                    <i class="fas fa-plus fa-2x"></i>
                </div>
                <div className="add_game">
                    Add Game to {consoleInfo.name}
                </div>
            </div >
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateGame setShowModal={setShowModal} consoleInfo={consoleInfo} />
                    </Modal>
                )
            }
        </>
    );
}

export default GameModal;
