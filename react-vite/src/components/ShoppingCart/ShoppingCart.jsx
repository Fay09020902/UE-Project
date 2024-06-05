import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CartUpdateButton from "./CartUpdateButton";
import {
	cartItemsArr,
	cartSelector,
	thunkPostTransaction,
	deleteCart,
} from "../../redux/cart";
import "./ShoppingCart.css";

const TAX = 7.46;
const FEE = 3;

export default function ShoppingCart() {
	const cart = useSelector(cartSelector);
	const cartItems = useSelector(cartItemsArr);
	const dispatch = useDispatch();

	const [tip, setTip] = useState(0.1);
	const [tipBg, setTipBg] = useState([true, false, false, false, false]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setTotal(cart.subTotal + cart.subTotal * tip + TAX + FEE);
	}, [cart, tip]);

	const handleClick = (tip, i) => () => {
		const bg = new Array(5).fill(false);
		bg[i] = !bg[i];
		setTipBg(bg);
		setTip(tip);
	};

	const handleDelete = () => dispatch(deleteCart());

	const postTransaction = () => {
		if (!cartItems?.length) {
			return alert("Add Items to Cart to Checkout.");
		}
		return dispatch(
			thunkPostTransaction(
				cartItems.map(([key, value]) => ({
					menu_items_id: +key,
					quantity: value.count,
				})),
			),
		);
	};

	return (
		<>
			<div className="ShoppingCart">
				<div className="ShoppingCart__detail_container">
					<div className="ShoppingCart__restaurant">Cart Items</div>
					<div className="ShoppingCart__details">
						<h2>Delivery details</h2>
						{cartItems.map(([key, value]) => {
							return (
								<section key={key}>
									<div className="bold">
										<span>
											{value.count} x {value.food_name}
										</span>
										<span>${value.price.toFixed(2)}</span>
									</div>
									<CartUpdateButton item={value} />
									<div></div>
									<div className="grey">{value.description}</div>
								</section>
							);
						})}
						<div className="grey">
							<span>
								<div>Total Items: {cart.count}</div>
							</span>
							<span>
								<div className="ShoppingCart__delete" onClick={handleDelete}>
									Delete All Items?
								</div>
							</span>
						</div>
					</div>
				</div>
				<div className="ShoppingCart__total_container">
					<div className="ShoppingCart__checkout" onClick={postTransaction}>
						Checkout
					</div>
					<div className="ShoppingCart__total">
						<h2>Order total</h2>
						<div className="grey">
							<span>Sub Total</span>
							<span>${cart.subTotal.toFixed(2)}</span>
						</div>
						<div className="grey">
							<span>Delivery Fee</span>
							<span>${FEE.toFixed(2)}</span>
						</div>
						<div className="grey">
							<span>Taxes & Other Fees</span>
							<span>${TAX.toFixed(2)}</span>
						</div>
						<div className="bold">Add a tip</div>
						<div className="ShoppingCart__tips bold">
							<span
								onClick={handleClick(0.1, 0)}
								style={{
									backgroundColor: tipBg[0]
										? "var(--white)"
										: "var(--main-bg-color)",
								}}
							>
								10%
							</span>
							<span
								onClick={handleClick(0.15, 1)}
								style={{
									backgroundColor: tipBg[1]
										? "var(--white)"
										: "var(--main-bg-color)",
								}}
							>
								15%
							</span>
							<span
								onClick={handleClick(0.18, 2)}
								style={{
									backgroundColor: tipBg[2]
										? "var(--white)"
										: "var(--main-bg-color)",
								}}
							>
								18%
							</span>
							<span
								onClick={handleClick(0.2, 3)}
								style={{
									backgroundColor: tipBg[3]
										? "var(--white)"
										: "var(--main-bg-color)",
								}}
							>
								20%
							</span>
							<span
								onClick={handleClick(0.25, 4)}
								style={{
									backgroundColor: tipBg[4]
										? "var(--white)"
										: "var(--main-bg-color)",
								}}
							>
								25%
							</span>
						</div>
						<div className="grey">
							100% of your tip goes to your courier. Tips are based on your
							order total of ${cart.subTotal.toFixed(2)} before any discounts or
							promotions.
						</div>
						<div className="bold">
							<span>Total</span>
							<span>${total.toFixed(2)}</span>
						</div>
						<div className="grey">
							If you’re not around when the delivery person arrives, they’ll
							leave your order at the door. By placing your order, you agree to
							take full responsibility for it once it’s delivered. Orders
							containing alcohol or other restricted items may not be eligible
							for leave at door and will be returned to the store if you are not
							available. Estimated pricing: We’ll put a hold on your card for up
							to ${total.toFixed(2)}. If any changes are made to your order to
							account for things like replacements or the actual weight of
							items, they will be reflected in the final charge on your receipt.
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
