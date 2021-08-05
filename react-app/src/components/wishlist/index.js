import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlists } from '../../store/wishlist'
import WishModal from '../wishListCreate'
import DeleteWishModal from '../wishlistDelete'
import EditWishModal from '../wishlistEdit'
import "./wishlist.css"


const WishListPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWishlists())
    }, [dispatch])

    const user = useSelector(state => state.session.user)
    const wish = useSelector((state) => Object.values(state.wishList))

    return (
        <div>
            <div className="cards_container">
                <div className="wishList_card">
                    <div className="wishList_header">
                        <div>
                            <h1>{user.username}'s WishList</h1>
                        </div>
                    </div>

                    <div>
                        <table className="game_table">
                            <tr>
                                <th>Title</th>
                                <th>Cib Value</th>
                                <th>Loose Value</th>
                                <th>Genre</th>
                                <th>Release date</th>
                                <th>Console</th>
                                <th>Edit/ Delete</th>
                            </tr>
                            {wish.map((wish) => (
                                <tr>
                                    <td>
                                        {wish.title}
                                    </td>
                                    <td>
                                        {`$${wish.cib_value}`}
                                    </td>
                                    <td>
                                        {`$${wish.loose_value}`}
                                    </td>
                                    <td>
                                        {wish.genre}
                                    </td>
                                    <td>
                                        {wish.release_date}
                                    </td>
                                    <td>
                                        {wish.consoleName}
                                    </td>
                                    <td>
                                        <div className="edit_delete_buttons">
                                            <div className="edit_game_button">
                                                <EditWishModal wish={wish} />
                                            </div>
                                            <div className="delete_game_button">
                                                <DeleteWishModal wish={wish} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                            ))}
                        </table>
                    </div>
                    <div>
                        <WishModal />
                    </div>

                </div>


            </div>
        </div>
    )

}

export default WishListPage
