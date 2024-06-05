import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartButton() {
	const navigate = useNavigate();
	const count = useSelector((state) => state.cart.count);
	return (
		<div className="CartButton">
			<FaCartShopping onClick={() => navigate("/cart")} />
			{count ? <div className="CartButton__alert">{count}</div> : null}
		</div>
	);
}
