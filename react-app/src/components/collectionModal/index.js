import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateCollection from "./CollectionModal";

function CollectionModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className='cta_button'
                onClick={() => setShowModal(true)}>
                Create A New Collection
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateCollection setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CollectionModal;
