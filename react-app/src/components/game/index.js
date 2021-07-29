import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { getCollections } from "../../store/collections";
import { getConsoles } from "../../store/console"
import ConsoleModal from '../createConsoleModal'
import EditConsoleModal from '../editConsoleModal'
import DeleteConsoleModal from "../deleteConsoleModal";
import AddGames from '../addGame'
import "./game.css"


const GamesPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCollections())
        dispatch(getConsoles(id))
    }, [dispatch])



    const collections = useSelector((state) => Object.values(state.collections))
    const collection = collections.find((collection) => collection?.id === +id)


    const consoles = useSelector((state) => Object.values(state.consoles))


    return (
        <>
            <div className="games_header">
                <div className="collection_title">
                    <h1>{collection?.name} Collection</h1>
                </div>
                <div>
                    <h2>{collection?.description}</h2>
                </div>
            </div>
            <div className="cards_container">
                {consoles.map((console) => (
                    <div className='console_card'>
                        <div className="cardHeader">
                            <div className="imgContainer" >
                                <img className="console_img" src={console.console_img_url} />
                            </div>
                            <div className="console_info">
                                <div className="console_name">
                                    <h2>{console.name}</h2>
                                </div>
                                <div className="console_name">
                                    <h3>{`Value: $${console.value}`}</h3>
                                </div>
                            </div>
                            <div className="icon_container">
                                <div className="edit_container">
                                    <EditConsoleModal console={console} />
                                </div>
                                <div className="delete_container">
                                    <DeleteConsoleModal console={console} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <AddGames />
                        </div>
                    </div>
                ))}
                <div className='console_card'>
                    <ConsoleModal id={id} />
                    <h3>Add A New Console</h3>
                </div>

            </div>


        </>

    )
}

export default GamesPage
