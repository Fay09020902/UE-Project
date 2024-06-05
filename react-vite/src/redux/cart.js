import { createSelector } from "reselect";

const ADD_CART_ITEM = "cart/add";
const REMOVE_CART_ITEM = "cart/remove";
const DELETE_CART = "cart/deleteCart";

export const addCartItem = (item) => ({
	type: ADD_CART_ITEM,
	payload: item,
});

export const removeCartItem = (item) => ({
	type: REMOVE_CART_ITEM,
	payload: item,
});

export const deleteCart = (item) => ({
	type: DELETE_CART,
	payload: item,
});

export const thunkPostTransaction = (items) => async (dispatch) => {
	const res = await fetch("/api/cart/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ cart_items: items }),
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(deleteCart());
		alert("Order Made!");
		return data;
	}
};

///
/// Selectors
///

export const cartSelector = (state) => state.cart;
export const cartItemsArr = createSelector(cartSelector, (cartItems) =>
	Object.entries(cartItems.items),
);

const initialState = { items: {}, subTotal: 0, count: 0, restaurantId: null };

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_CART_ITEM: {
			const newObj = { ...state };
			if (state.restaurantId === null) {
				newObj.restaurantId = action.payload.restaurant_id;
			}

			if (newObj.items[action.payload.id]) {
				newObj.items[action.payload.id].count++;
			} else {
				newObj.items[action.payload.id] = action.payload;
				newObj.items[action.payload.id].count = 1;
			}
			newObj.count++;
			newObj.subTotal += action.payload.price;
			return newObj;
		}
		case REMOVE_CART_ITEM: {
			const newObj = { ...state };
			newObj.items[action.payload.id].count--;
			if (!newObj.items[action.payload.id].count) {
				delete newObj.items[action.payload.id];
			}
			newObj.count--;
			if (!newObj.count) {
				newObj.restaurantId = null;
			}
			newObj.subTotal -= action.payload.price;
			return newObj;
		}
		case DELETE_CART:
			return { items: {}, subTotal: 0, count: 0, restaurantId: null };
		default:
			return state;
	}
}
