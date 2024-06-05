const LOAD_RESTAURANTS = "restaurants/loadRestaurants";
const ADD_RESTAURANT = "restaurants/addRestaurant";
// const UPDATE_RESTAURANT = 'restaurants/updateRestaurant';
const DELETE_RESTAURANT = "restaurants/deleteRestaurant";
const SET_DETAILS = "restaurants/setDetails";

export const loadRestaurants = (restaurants) => ({
	type: LOAD_RESTAURANTS,
	payload: restaurants,
});

// Regular action for adding new restaurant
export const addRestaurant = (restaurant) => ({
	type: ADD_RESTAURANT,
	payload: restaurant,
});

// Thunk action for adding new restaurant
export const addRestaurantThunk = (newRestaurnt) => async (dispatch) => {
	// console.log('addRestaurantThunk()')
	const response = await fetch("/api/restaurants/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newRestaurnt),
	});
	// console.log("response: ", response);
	if (response.ok) {
		const data = await response.json();
		// console.log("create succeed, ",data )
		dispatch(addRestaurant(data));
		return data
	}
	else {
		const errorMessages = await response.json();
		// console.log("create failed, ",errorMessages )
		return { "errors": errorMessages }
	}
};

export const deleteRestaurant = (restaurantId) => ({
	type: DELETE_RESTAURANT,
	payload: restaurantId,
});

const setDetails = (payload) => ({
	type: SET_DETAILS,
	payload,
});

export const loadRestaurantsThunk = () => async (dispatch) => {
	const response = await fetch("/api/restaurants/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
		dispatch(loadRestaurants(data));
	}
};

export const loadRestDetails = (id) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/${id}`);

	if (res.ok) {
		const data = await res.json();
		dispatch(setDetails(data));
	}
};

export const loadSessionRestaurantsThunk = () => async (dispatch) => {
	const response = await fetch("/api/restaurants/current");
	if (response.ok) {
		const data = await response.json();
		// console.log("res for current in backend: ", r)
		if (data.errors) {
			return data.errors;
		}
		dispatch(loadRestaurants(data));
	}
};

export const updateRestaurantThunk = (payload, id) => async (dispatch) => {
	const response = await fetch(`/api/restaurants/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(addRestaurant(data));
	}
	else {
		const errorMessages = await response.json();
		return { "errors": errorMessages }
	}
};

export const deleteRestaurantThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/restaurants/${id}`, {
		method: "DELETE",
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(deleteRestaurant(id));
		return data;
	} else {
		const error = await response.json();
		return error;
	}
};

const initialState = {
	restaurants: {},
	restaurantsDetails: {},
};

const restaurantsReducer = (state = initialState, action) => {
	// let newState;
	switch (action.type) {
		case LOAD_RESTAURANTS: {
			const newState = { ...state, ...action.payload };
			return newState;
		}
		case ADD_RESTAURANT: {
			const newRstrnt = { ...state.restaurants };
			newRstrnt[action.payload.id] = action.payload;
			return {
				...state,
				restaurants: newRstrnt,
			};
		}
		case DELETE_RESTAURANT: {
			const updatedRestaurants = { ...state.restaurants };
			delete updatedRestaurants[action.payload];
			return { ...state, restaurants: updatedRestaurants };
		}
		case SET_DETAILS:
			return { ...state, restaurantsDetails: action.payload };
		default:
			return state;
	}
};

export default restaurantsReducer;
