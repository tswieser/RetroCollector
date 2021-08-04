import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postConsoles } from '../../store/console'
import './createConsole.css'

function CreateConsole({ setShowModal, id }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()
        const newConsole = {
            name,
            value,
            console_img_url: imgUrl
        }
        const data = await dispatch(postConsoles(id, newConsole))
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
                        <h1 className='add_form_title'>Add A New Console</h1>
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
                        <input id="imgUrl" className="console_input_name" name="imgUrl" type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                    </div>

                    <div className="form_label_container">
                        <label htmlFor="name" className="form_labels">
                            Console Value
                        </label>
                    </div>
                    <div>
                        <input id="value" className="console_input_name" name="value" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                    </div>
                    <div className="button_container">
                        <button className="form_edit_button" type="submit">
                            Add Console
                        </button>
                    </div>

                </form>

            </div>

        </>
    )






}
export default CreateConsole
