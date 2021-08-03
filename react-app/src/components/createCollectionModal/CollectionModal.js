import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postCollection } from '../../store/collections'


function CreateCollection({ setShowModal }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()
        const newCollection = {
            name,
            description,
            collection_img_url: imgUrl
        }
        const data = await dispatch(postCollection(newCollection))
        if (data.errors) {
            setErrors(data.errors);
            return
        }
        setShowModal(false);
    }

    return (
        <>
            <div className="form_container">
                <form onSubmit={handleSubmit}>
                    <div className="title_container">
                        <h1 className='form_title'>Create a New Collection</h1>
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
                        <input id="imgUrl" className="collection_input_name" name="imgUrl" type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
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
                        <button className="form_button" type="submit">
                            Submit Collection
                        </button>
                    </div>

                </form>

            </div>

        </>
    )




}

export default CreateCollection
