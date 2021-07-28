import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteConsole from "./deleteConsole";

function DeleteConsoleModal({ console }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <i class="fas fa-trash-alt"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteConsole console={console} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default DeleteConsoleModal;
