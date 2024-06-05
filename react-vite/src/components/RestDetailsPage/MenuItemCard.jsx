import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../redux/cart";

export default function MenuItemCard({ item, restaurantId }) {
	const stateRestId = useSelector((state) => state.cart.restaurantId);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const addItem = (menuitem) => () => {
		if ((user && stateRestId === null) || restaurantId === stateRestId) {
			dispatch(addCartItem(menuitem));
		} else if (!user) {
			alert("Login or Signup to add items to your cart.");
		} else {
			alert(
				"To add items from a different restaurant, delete items currently in your cart.",
			);
		}
	};

	return (
		<div className="RestDetails__menuCard">
			<div className="RestDetails__menuCardDetails">
				<div>
					<div className="bold">{item.food_name}</div>
					<p>${item.price}</p>
					<div className="grey">{item.description}</div>
				</div>
			</div>
			<div className="RestDetails__menuImgContainer">
				<img className="RestDetails__menuImg" src={item.img_url} />
			</div>
			<div className="RestDetails__addButton" onClick={addItem(item)}>
				<div>+</div>
			</div>
		</div>
	);
}
