
const LOAD_MENUITEMS = 'restaurants/items'
const LOAD_MENUITEMS_ERROR = 'restaurants/itemserror'
const LOAD_MENUITEM = 'restaurants/item'
const DELETE_MENUITEMS = 'menuitemsdelete'
const ADD_MENUITEMS = 'menuitemsadd'
const UPDATE_MENUITEM = 'menuitem/update'


// regular action creator to load menu-items
const loaditems = (payload) => {
    // console.log('testing from loaditem action: ', payload)
    return {
        type: LOAD_MENUITEMS,
        payload
    }
}
// regular action creator to load menu-items with error
const loaditemsError = (error) => {
    // console.log('testing from loaditem action errror: ', error)
    return {
        type: LOAD_MENUITEMS_ERROR,
        error
    }
}
// thunk action creator to load menu-items from database
export const loaditemsfromDB = (restaurant_id) => async (dispatch) => {
    // console.log('restaurnt id from thunk: ', restaurant_id)
    const response = await fetch(`/api/restaurants/${restaurant_id}/menu-items`);
    // console.log('response: ', response)
    if (response.ok) {
        const data = await response.json();
        if (data['err']) {
            dispatch(loaditemsError(data))
        } else {
            dispatch(loaditems(data))
        }
    }
}



// regular action creator to delete item
const deleteitem = (item_id) => {
    return {
        type: DELETE_MENUITEMS,
        item_id,
    }
}
// thunk action creator to delete item
export const deleteitemfromDB = (item_id) => async (dispatch) => {
    // console.log('deleteitemfromDB() called')
    const response = await fetch(`/api/restaurants/menu-items/${item_id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        // const data = await response.json();
        dispatch(deleteitem(item_id));
        // console.log('deleted successfully...')
    }
}




// regular action creator to add a new item
const additem = (newItem) => {
    return {
        type: ADD_MENUITEMS,
        newItem
    }
}
// thunk action creator to add a new item
export const additemtoDB = (new_item, restaurant_id) => async (dispatch) => {
    // console.log('starting to fetch...')
    const response = await fetch(`/api/restaurants/${restaurant_id}/menu-items/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_item)
    })
    if (response.ok) {
        // console.log('New item added...')
        const data = await response.json();
        dispatch(additem(data))
        return;
    }else{
        const errors = await response.json();
        return errors
        // the bellow is new
        // return rejectWithValue(errors);
    }
}



// regular action creatro to load a menu-item by its ID
const loaditem = (menuitem) => {
    return {
        type: LOAD_MENUITEM,
        menuitem
    }
}
// thunk action creator to load a menu-item by its ID
export const loaditemfromDB = (id) => async (dispatch) => {
    const response = await fetch(`/api/menu-items/${id}/`);
    // console.log('item loaded...', response)
    if (response.ok) {
        const data = await response.json();
        // console.log('item jsoned: ', data)
        dispatch(loaditem(data));
    }
}



// regular action creator to update an item
const updateitem = (updateditem) => {
    return {
        type: UPDATE_MENUITEM,
        updateditem
    }
}
// thunk action creator to update an item
export const updateitemtoDB = (updateditem, item_id) => async (dispatch) => {
    const response = await fetch(`/api/menu-items/${item_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateditem)
    })

    console.log('response: ', response)
    if (response.ok) {
        const data = await response.json();
        console.log('data: ', data)
        dispatch(updateitem(data))
    }else{
        const errors = await response.json();
        console.log('erros: ', errors)
        return errors
    }
}



// menu items reducer
const initialState = {
    menuItems: {},
    error: null,
};
const menuitemsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_MENUITEMS:
            // console.log('loaeded items: ', action.payload)
            return { ...state, menuItems: action.payload, error: null }; 
            // return { ...state, ...action.payload }
        case LOAD_MENUITEMS_ERROR:
            return {...state, menuItems: null, error: action.error}
            // return action.error
        case DELETE_MENUITEMS: {
            newState = { ...state }
            delete newState.menuItems[action.item_id]
            return newState
        }
        case ADD_MENUITEMS: {
            return {...state, menuItems: {...state.menuItems, [action.newItem.id]: action.newItem}}
            // newState = { ...state }
            // newState[action.newItem.id] = action.newItem
            // return newState
        }
        case UPDATE_MENUITEM: {
            return {...state, menuItems: {...state.menuItems, [action.updateditem.id]: action.updateditem}}
            // newState = { ...state }
            // return newState
        }
        case LOAD_MENUITEM:
            return {...state, menuItems: {...state.menuItems, [action.menuitem.id]: action.menuitem}}
            // return { ...state, [action.menuitem.id]: action.menuitem }
        default:
            return state
    }
}

export default menuitemsReducer;