import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getCollections } from "../../store/collections";
import { Link } from "react-router-dom";
import CollectionModal from '../collectionModal'
import './collection.css'

const CollectionsPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCollections())
    }, [dispatch])

    let collections = useSelector((state) => Object.values(state.collections))
    console.log(collections[0])
    return (
        <>
            <CollectionModal />
            {collections.map((collection) => (
                <div className="collection_card">
                    <div className="collection_name">
                        <Link className="collection_name" key={collection.id} to={`/api/collections/${collection.id}`}>
                            {collection.name}
                        </Link>
                    </div>
                    <div className="collection_description">
                        {collection.description}
                    </div>
                    <div >
                        <img className="collection_img" src={collection.collection_img_url} />
                    </div>
                </div>

            ))}
        </>
    )
}

export default CollectionsPage
