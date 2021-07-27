import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCollection from "./EditCollectionModal";

function EditCollectionModal({ collection }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <i class="fas fa-edit"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCollection collection={collection} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditCollectionModal;
