import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteCollection from "./DeleteCollection";

function DeleteCollectionModal({ collection }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <i class="fas fa-trash-alt"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteCollection collection={collection} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default DeleteCollectionModal;
