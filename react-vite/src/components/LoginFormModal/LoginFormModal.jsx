import { useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const serverResponse = await dispatch(
			thunkLogin({
				email,
				password,
			}),
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			closeModal();
		}
	};

	const handleDemoLogin = async (e) => {
		e.preventDefault();
		
		const serverResponse = await dispatch(
			thunkLogin({
				email: 'marnie@marnie.com',
				password: 'password',
			}),
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			closeModal();
		}

	}

	return (
		<form onSubmit={handleSubmit} className="LoginModal">
			<div>
				<h1 className="LoginModal__header">Log In</h1>
				<label className="LoginModal__label">Email</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				{errors.email && (
					<p>
						<FaCircleXmark />
						{errors.email}
					</p>
				)}
				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{errors.password && (
					<p>
						<FaCircleXmark />
						{errors.password}
					</p>
				)}
				<button type="submit">Log In</button>
				<button type='button' style={{marginLeft:'15px'}} onClick={handleDemoLogin}>Log in as Demo User</button>
			</div>
		</form>
	);
}

export default LoginFormModal;
