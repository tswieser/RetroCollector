import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteWish from "./wishListDelete";

function DeleteWishModal({ wish }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <i class="fas fa-trash-alt"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteWish wish={wish} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default DeleteWishModal;
