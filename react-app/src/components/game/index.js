import React from "react";
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";


const GamesPage = () => {
    const { id } = useParams()
    const collections = useSelector((state) => Object.values(state.collections))
    const collection = collections.find((collection) => collection?.id === +id)

    console.log(collection)
    return (
        <>
            <h1>Games Page</h1>

        </>

    )
}

export default GamesPage
