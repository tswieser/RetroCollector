import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditConsole from "./editConsole";

function EditConsoleModal({ consoleInfo }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <i class="fas fa-edit"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditConsole consoleInfo={consoleInfo} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditConsoleModal;
