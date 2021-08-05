import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditWish from "./wishlistEdit";

function EditWishModal({ wish }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <i class="fas fa-edit"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditWish wish={wish} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditWishModal;
