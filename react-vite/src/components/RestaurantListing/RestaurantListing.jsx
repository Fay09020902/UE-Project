import RestaurantItem from '../RestaurantItem';
import './RestaurantListing.css';


function RestaurantListing({ feature, allRestaurants }) {
    // const dispatch = useDispatch();
    // const allRestaurants = useSelector(state => state.restaurants.restaurants);

    // useEffect(() => {
    //     console.log('useEffect for RestaurantListing runs');
    //     dispatch(loadRestaurantsThunk());
    // }, [dispatch]);

    if (!Object.values(allRestaurants).length) return <div>No Restaurants</div>;

    const hasFeature = !!feature
    return (
        <div className="restaurant-list">
            {feature && <h2 className="feature-heading">{feature.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h2>}
            {!feature && <h2 className="feature-heading">All Stores</h2>}
            <div className={`restaurantSection${hasFeature ? ' scrollable' : ''}`} key={feature}>
                <div className="item-container">
                    {feature ? (
                        Object.values(allRestaurants)
                            .filter(restaurant => restaurant[feature])
                            .map(restaurant => (
                                <div className="item" key={restaurant.id}>
                                    <RestaurantItem restaurantId={restaurant.id} restaurant={restaurant} />
                                </div>
                            ))
                    ) : (
                        Object.values(allRestaurants).map(restaurant => (
                            <div className="item" key={restaurant.id}>
                                <RestaurantItem restaurantId={restaurant.id} restaurant={restaurant} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default RestaurantListing;
