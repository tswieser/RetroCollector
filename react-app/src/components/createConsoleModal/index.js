import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateConsole from "./CreateConsole";


function ConsoleModal({id}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="plus_div" onClick={() => setShowModal(true)}>
                <i className="fas fa-plus fa-5x"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateConsole setShowModal={setShowModal} id={id}/>
                </Modal>
            )}
        </>
    );
}

export default ConsoleModal;
