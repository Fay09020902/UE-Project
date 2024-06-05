import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteitemfromDB, loaditemsfromDB } from '../../redux/menu_items';
import './ManageMenuItems.css';
import { useNavigate, useParams } from 'react-router-dom';
const ManageMenuItems = () => {
  // list of menu items



  const menu_items = useSelector(state => {
    const items = state.menuitems.menuItems || {};
    return Object.values(items)
  });

  const error = useSelector(state => {
    const e = state.menuitems.error || {};
    return Object.values(e)
  })


  const current_user = useSelector(state => state.session.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {id} = useParams(); // Selected restaurant id
  // console.log('restaurant id: ', id)


  useEffect(() => {
    dispatch(loaditemsfromDB(id))
  }, [dispatch, id])

  if (!current_user) {
    return <p>You must loggin first...</p>
  }

  const addnewitem = () => {
    navigate(`/restaurants/${id}/addnewitem`)
  }

  const updateitem = (item_id, restaurant_id) => {
    navigate(`/restaurants/${item_id}/item`, {
      state: {restaurant_id}
    })
  }
  const deleteitem = (item_id) => {
    dispatch(deleteitemfromDB(item_id))
    alert('item deleted successfully...')
    navigate(`/restaurants/${id}/menu-items`)
  }
  return (
    <div className="additemcontainer">
      <div className='manage_menu_items'>
        <h1>Restaurant&apos;s Menu</h1>
        <h3>Restaurant Owner: {current_user}</h3>
        <div className='addanitem'><button className='createbtn' onClick={() => addnewitem()}>Add a new Item</button></div>
        <hr />
        <ul className='menu_items'>
          <li style={{ fontSize: "1.5em" }}><span>No</span><span>Name</span><span>Type</span><span>Price</span><span>Update</span><span>Delete</span></li>
          <hr />
          {menu_items.length > 0 ? (
            menu_items.map(item => (
              <li key={item.id}><span>{item.id}</span><span>{item.food_name}</span><span>{item.type}</span><span>{item.price}</span><span className='update' onClick={() => updateitem(item.id, id)}>Update</span><span className='delete' onClick={() => deleteitem(item.id)}>Delete</span></li>
            ))
          ) : (<p>{error}</p>)}
        </ul>
      </div>
    </div>
  )
}

export default ManageMenuItems
