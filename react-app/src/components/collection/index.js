import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getCollections } from "../../store/collections";

const CollectionsPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCollections())
    }, [dispatch])

    let collections = useSelector((state) => Object.values(state.collections))
    console.log(collections)
    return (
        <>
            <h1>Collections Page</h1>
        </>

    )

}

export default CollectionsPage
