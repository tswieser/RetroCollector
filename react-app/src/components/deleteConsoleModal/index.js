import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteConsole from "./deleteConsole";

function DeleteConsoleModal({ consoleInfo }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <i class="fas fa-trash-alt"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteConsole consoleInfo={consoleInfo} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default DeleteConsoleModal;
