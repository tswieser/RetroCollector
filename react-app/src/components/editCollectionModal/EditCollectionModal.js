import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { putCollection } from '../../store/collections'
import "./editCollection.css"

function EditCollection({ setShowModal, collection }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(collection.name);
    const [description, setDescription] = useState(collection.description);
    const [imgUrl, setImgUrl] = useState(collection.collection_img_url);

    async function handleSubmit(e) {
        e.preventDefault()
        const newCollection = {
            name,
            description,
            collection_img_url: imgUrl
        }
        const data = await dispatch(putCollection(collection.id, newCollection))
        if (data.errors) {
            setErrors(data.errors);
            return
        }
        setShowModal(false);
    }

    return (
        <>
            <div className="edit_form_container">
                <form onSubmit={handleSubmit}>
                    <div className="title_container">
                        <h1 className='edit_form_title'>Edit Collection</h1>
                    </div>
                    <ul className="form_error_container">
                        {errors &&
                            errors.map((error, i) => (
                                <li className="errors" key={i}>
                                    {error}
                                </li>
                            ))}
                    </ul>
                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Collection Name
                        </label>
                    </div>
                    <div>
                        <input id="name" className="collection_input_name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Collection Image Url
                        </label>
                    </div>
                    <div>
                        <input  placeholder="Optional" id="imgUrl" className="collection_input_name" name="imgUrl" type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                    </div>
                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Collection Description
                        </label>
                    </div>
                    <div>
                        <textarea id="description" className="collection_input_description" name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="button_container">
                        <button className="form_edit_button" type="submit">
                            Edit Collection
                        </button>
                    </div>

                </form>

            </div>

        </>
    )




}

export default EditCollection
