import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import RestaurantIndex from "../components/RestaurantIndex";
import AccountPage from "../components/AccountPage";
import Layout from "./Layout";
import RestDetails from "../components/RestDetailsPage";
import AddYourRestaurant from "../components/AddYourRestaurant/AddYourRestaurant";
import ShoppingCart from "../components/ShoppingCart";
import EditRestaurantForm from "../components/EditRestaurantForm";
import ManageMenuItems from "../components/ManageMenuItems";
import AddNewItem from "../components/ManageMenuItems/AddNewItem";
import UpdateItem from "../components/ManageMenuItems/UpdateItem";

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <RestaurantIndex />,
			},
			{
				path: "login",
				element: <LoginFormPage />,
			},
			{
				path: "signup",
				element: <SignupFormPage />,
			},
			{
				path: "/restaurants/:id",
				element: <RestDetails />,
			},
			{
				path: "/restaurants/addyourrestaurant",
				element: <AddYourRestaurant />,
			},
			{
				path: "/cart",
				element: <ShoppingCart />,
			},
			{
				path: "/myaccountpage",
				element: <AccountPage />,
			},
			{
				path: "/restaurants/:restaurantId/edit",
				element: <EditRestaurantForm />,
			},
			{
				path: "/restaurants/:id/menu-items",
				element: <ManageMenuItems />,
			},
			{
				path: "/restaurants/:id/addnewitem",
				element: <AddNewItem />,
			},
			{
				path: "/restaurants/:id/item",
				element: <UpdateItem />,
			},
		],
	},
]);
