import './RestaurantCategory.css';



function RestaurantCategory({categories}) {

    const categoriesimgMap = {
        "Seafood" : "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Seafood.png",
        "Pizza" : "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Pizza.png",
        "Italian": "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Italian.png",
        "Bakery": "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/Grocery.png"
    }

    return (
        <section className="restaurant-categories">
            <div className="category-list">
                {categories.map(category => (
                    <div key={category} className="category-card">
                        <img src={categoriesimgMap[category] ?? categoriesimgMap["Bakery"]} alt={category} />
                        <h3>{category}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default RestaurantCategory;
