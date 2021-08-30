import { NavLink } from 'react-router-dom';
import './home.css'


const HomePage = () => {

    return (
        <>
            <div className="home_wrapper">
                <div className="Home_background"></div>
                <div className="home_title_container">
                    Welcome To Retro Collector
                </div>
                <div className="home_box_container">
                    <div className="left_box">
                        <div className="home_box_icon">
                            <i class="fas fa-lock fa-5x"></i>
                        </div>
                        <div className="home_box_text">
                            <div>
                                A Secure space to store, track, and catalog  your video game collection.
                            </div>
                        </div>
                        <div className="home_btn_container">
                            <NavLink style={{ textDecoration: 'none' }} to='/collections' exact={true}>
                                <button className="home_button">
                                    CREATE A COLLECTION
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="right_box">
                        <div className="home_box_icon">
                            <i class="fas fa-search fa-5x"></i>
                        </div>
                        <div className="home_box_text">
                            <div>
                                Explore All kinds of games and create wishlists to track values to get the best deals
                            </div>
                        </div>
                        <div className="home_btn_container">
                            <NavLink style={{ textDecoration: 'none' }} to='/wishlist' exact={true}>
                                <button className="home_button">
                                    CREATE A WISHLIST
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default HomePage
