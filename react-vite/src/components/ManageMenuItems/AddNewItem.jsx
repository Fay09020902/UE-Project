import { useState } from 'react'
import { useDispatch } from 'react-redux';
import './AddNewItem.css';
import { additemtoDB } from '../../redux/menu_items';
import { useNavigate, useParams } from 'react-router-dom';
const AddNewItem = () => {
    const [type, setType] = useState('');
    const [food_name, setFood_name] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [img_url, setImg_url] = useState('');


    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();


    const [errors, setErrors] = useState({});

    const addnewitem = async (e) => {
        e.preventDefault();
        const newitem = {
            food_name,
            type,
            description,
            price,
            img_url,
        }

        // if (isNaN(price)) {
        // 	return setErrors({
        // 		price: "Price must be anumber"
        // 	});
        // }

        const resultfromDB = await dispatch(additemtoDB(newitem, id))

        const all_errors = {};

        if(resultfromDB && typeof resultfromDB === 'object'){
            if (resultfromDB.food_name) {
                all_errors['food_name'] = resultfromDB.food_name;
            }
            if (resultfromDB.type) {
                all_errors['type'] = resultfromDB.type;
            }
            if (resultfromDB.description) {
                all_errors['description'] = resultfromDB.description;
            }
            if (resultfromDB.price) {
                all_errors['price'] = resultfromDB.price;
            }
            if (resultfromDB.img_url) {
                all_errors['img_url'] = resultfromDB.img_url;
            }
    
            setErrors(all_errors);
        }else{
            // navigation upon successful addition / no error
            navigate(`/restaurants/${id}/menu-items`)
        }

        // console.log('all_errors: ', all_errors)
        // navigation upon successful addition / no error
        // if(Object.values(all_errors).length == 0){
        //     navigate(`/restaurants/${id}/menu-items`)
        // }



    }

    return (
        <div className="additem_container">
            <div className='add_newitem'>
                <h1>Add a new item in your restaurant&apos;s menu</h1>
                <form className="newitemForm" onSubmit={addnewitem}>
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
                        <button>Add the item</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddNewItem