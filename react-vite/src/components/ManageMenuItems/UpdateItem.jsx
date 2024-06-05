import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './AddNewItem.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { loaditemfromDB, updateitemtoDB } from '../../redux/menu_items';

const UpdateItem = () => {
    
    const dispatch = useDispatch();
    const item_id = useParams();


    const location = useLocation();
    const {restaurant_id} = location.state || {};
    // console.log('restaurant id on update item page: ', restaurant_id)

    const navigate = useNavigate();
    const selecteditem = item_id.id;
    // console.log('item_id.id: ', item_id.id)

    const all_items = useSelector(state => {
        const items = state.menuitems.menuItems || {};
        return Object.values(items)
      });

    //   console.log('all_items: ', all_items)

    const chosenitem = all_items.filter(item => item.id == selecteditem);

    const [type, setType] = useState(chosenitem[0].type);
    const [food_name, setFood_name] = useState(chosenitem[0].food_name)
    const [description, setDescription] = useState(chosenitem[0].description);
    const [price, setPrice] = useState(chosenitem[0].price);
    const [img_url, setImg_url] = useState(chosenitem[0].img_url);

    const [errors, setErrors] = useState({});
    const updateitem = async (e) => {
        e.preventDefault();
        const newitem = {
            food_name,
            type,
            description,
            price,
            img_url,
        }
        const updatetoDB = await dispatch(updateitemtoDB(newitem, selecteditem))


        const all_errors = {};

        if(updatetoDB && typeof updatetoDB === 'object'){
            if (updatetoDB.food_name) {
                all_errors['food_name'] = updatetoDB.food_name;
            }
            if (updatetoDB.type) {
                all_errors['type'] = updatetoDB.type;
            }
            if (updatetoDB.description) {
                all_errors['description'] = updatetoDB.description;
            }
            if (updatetoDB.price) {
                all_errors['price'] = updatetoDB.price;
            }
            if (updatetoDB.img_url) {
                all_errors['img_url'] = updatetoDB.img_url;
            }
    
            setErrors(all_errors);
        }else{
            // navigation upon successful addition / no error
            navigate(`/restaurants/${restaurant_id}/menu-items`)
        }



        // console.log('updatedtoDB: ', updatetoDB)
        // alert('Item updated successfully...')
        // navigate(`/restaurants/${restaurant_id}/menu-items`)
    }


    useEffect(()=> {
        dispatch(loaditemfromDB(selecteditem))
    },[dispatch, selecteditem]);

  return (
    <div className="additem_container">
            <div className='add_newitem'>
                <h1>Add a new item in your restaurant&apos;s menu</h1>
                <form className="newitemForm" onSubmit={updateitem}>
                    <div>
                        <label htmlFor="name">Food Name</label>
                        <p style={{ color: "red" }}>
                            {errors.food_name}
                        </p>
                        <input type="text" value={food_name} onChange={e => setFood_name(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="RestaurantType">Resaurant Type</label>
                        <p style={{ color: "red" }}>
                            {errors.type}
                        </p>
                        <input type="text" value={type} onChange={e => setType(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="Description">Description</label>
                        <p style={{ color: "red" }}>
                            {errors.description}
                        </p>
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="Price">Price</label>
                        <p style={{ color: "red" }}>
                            {errors.price}
                        </p>
                        <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="img_url">Image</label>
                        <p style={{ color: "red" }}>
                            {errors.img_url}
                        </p>
                        <input type="text" value={img_url} onChange={e => setImg_url(e.target.value)} />
                    </div>
                    <div className='sbmtbtn'>
                        <button>Update the item</button>
                    </div>

                </form>
            </div>
        </div>
  )
}

export default UpdateItem