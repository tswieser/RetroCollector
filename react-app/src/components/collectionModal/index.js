import React, { useState } from "react";
import { Modal } from "../../context/Modal";
// import CreateClub from "./ClubModal";

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
                    {/* <CreateClub setShowModal={setShowModal} /> */}
                </Modal>
            )}
        </>
    );
}

export default CollectionModal;
