import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { putConsole } from '../../store/console'





function EditConsole({ setShowModal, console }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(console.name);
    const [value, SetValue] = useState(console.value);
    const [imgUrl, setImgUrl] = useState(console.console_img_url);

    async function handleSubmit(e) {
        e.preventDefault()
        const newConsole = {
            name,
            value,
            console_img_url: imgUrl
        }
        const data = await dispatch(putConsole(console.id, newConsole))
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
                        <h1 className='form_title'>Edit Collection</h1>
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
                            Console Name
                        </label>
                    </div>
                    <div>
                        <input id="name" className="collection_name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Console Image Url
                        </label>
                    </div>
                    <div>
                        <input id="imgUrl" className="collection_imgUrl" name="imgUrl" type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                    </div>
                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Console Value
                        </label>
                    </div>
                    <div>
                        <input id="value" className="collection_description" name="value" type="text" value={value} onChange={(e) => SetValue(e.target.value)} />
                    </div>
                    <div className="button_container">
                        <button className="form_button" type="submit">
                            Edit Console
                        </button>
                    </div>

                </form>

            </div>

        </>
    )




}

export default EditConsole
