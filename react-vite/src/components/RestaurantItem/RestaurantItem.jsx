import './RestaurantItem.css';
import { NavLink} from 'react-router-dom';

function RestaurantItem({restaurant}) {


    return (
        <div className='RestaurantItemContainer'>
            <NavLink to={`/restaurants/${restaurant.id}`} className="image-detail-link">
                <img
                    className="restaurant-entry-image"
                    alt={restaurant.img_url}
                    src={`${restaurant.img_url}`}
                />
            </NavLink>
                 <div className="restaurant-item">
                        <div className='name'>{restaurant.name}</div>
                </div>
        </div>
    )
}

export default RestaurantItem;
