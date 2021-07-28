import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getCollections } from "../../store/collections";
import { Link } from "react-router-dom";
import CollectionModal from '../createCollectionModal'
import EditCollectionModal from '../editCollectionModal'
import DeleteCollectionModal from '../deleteCollectionModal'
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
            <div className="cards_container">
                {collections.map((collection) => (
                    <div className="collection_card">
                        <div >
                            <img className="collection_img" src={collection.collection_img_url} />
                        </div>
                        <div className="collection_name">
                            <Link style={{ textDecoration: 'none' }} className="collection_name" key={collection.id} to={`/api/collections/${collection.id}`}>
                                <h2>{collection.name}</h2>
                            </Link>
                        </div>
                        <div className="collection_description">
                            {collection.description}
                        </div>
                        <div className="icon_container">
                            <div className="edit_container">
                                <EditCollectionModal collection={collection} />
                            </div>
                            <div className="delete_container">
                                <DeleteCollectionModal collection={collection} />
                            </div>
                        </div>
                    </div>


                ))}
            </div>
        </>
    )
}

export default CollectionsPage
