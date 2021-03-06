import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateCollection from "./CollectionModal";
import "./CreateCollection.css"

function CollectionModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="plus_div" onClick={() => setShowModal(true)}>
                <i class="fas fa-plus fa-5x"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateCollection setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CollectionModal;
