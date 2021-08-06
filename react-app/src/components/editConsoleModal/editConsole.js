import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { putConsole } from '../../store/console'
import "./editConsole.css"


function EditConsole({ setShowModal, consoleInfo }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(consoleInfo.name);
    const [value, SetValue] = useState(consoleInfo.value);
    const [imgUrl, setImgUrl] = useState(consoleInfo.console_img_url);

    async function handleSubmit(e) {
        e.preventDefault()
        const newConsole = {
            name,
            value,
            console_img_url: imgUrl
        }
        const data = await dispatch(putConsole(consoleInfo.id, newConsole))
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
                        <h1 className='edit_console_form_title'>Edit Console</h1>
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
                        <input id="name" className="console_input_name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Console Image Url
                        </label>
                    </div>
                    <div>
                        <input placeholder="Optional" id="imgUrl" className="console_input_name" name="imgUrl" type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                    </div>
                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Console Value
                        </label>
                    </div>
                    <div>
                        <input id="value" className="console_input_name" name="value" type="text" value={value} onChange={(e) => SetValue(e.target.value)} />
                    </div>
                    <div className="button_container">
                        <button className="form_edit_button" type="submit">
                            Edit Console
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditConsole
