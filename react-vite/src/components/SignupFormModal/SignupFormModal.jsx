import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaCircleXmark } from "react-icons/fa6";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");

	const [errors, setErrors] = useState({});
	const [hidden, setHidden] = useState(false);
	const { closeModal } = useModal();

	const handleClick = () => setHidden((state) => !state);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setErrors({
				confirmPassword:
					"Confirm Password field must be the same as the Password field",
			});
		}

		const serverResponse = await dispatch(
			thunkSignup({
				email,
				phone,
				username,
				password,
				first_name: firstName,
				last_name: lastName,
				address,
				city,
				country,
			}),
		);

		// console.log('sign up errors: ', serverResponse)
		
		if (serverResponse) {
			setErrors(serverResponse);
			setHidden((state) => !state);
		} else {
			closeModal();
		}
	};

	return (
		<form onSubmit={handleSubmit} className="LoginModal">
			{!hidden && (
				<div className="first">
					<h1 className="LoginModal__header">Sign Up</h1>
					{errors.server && (
						<p>
							<FaCircleXmark />
							{errors.server}
						</p>
					)}
					<label>First Name</label>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
					{errors.first_name && (
						<p>
							<FaCircleXmark />
							{errors.first_name}
						</p>
					)}
					<label>Last Name</label>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
					{errors.last_name && (
						<p>
							<FaCircleXmark />
							{errors.last_name}
						</p>
					)}
					<label>Street Address</label>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
					{errors.address && (
						<p>
							<FaCircleXmark />
							{errors.address}
						</p>
					)}
					<label>City</label>
					<input
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					/>
					{errors.city && (
						<p>
							<FaCircleXmark />
							{errors.city}
						</p>
					)}
					<label>Country</label>
					<input
						type="text"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						required
					/>
					{errors.country && (
						<p>
							<FaCircleXmark />
							{errors.country}
						</p>
					)}

					<div className="SignupForm__next">
						<button onClick={handleClick}>Next {">"}</button>
					</div>
				</div>
			)}
			{hidden && (
				<div className="second">
					<h1 className="LoginModal__header">Sign Up</h1>
					{errors.server && (
						<p>
							<FaCircleXmark />
							{errors.server}
						</p>
					)}
					<label>Email</label>
					<input
						type="email"
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
					<label>Phone</label>
					<input
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
					/>
					{errors.phone && (
						<p>
							<FaCircleXmark />
							{errors.phone}
						</p>
					)}
					<label>Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					{errors.username && (
						<p>
							<FaCircleXmark />
							{errors.username}
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
					<label>Confirm Password</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					{errors.confirmPassword && (
						<p>
							<FaCircleXmark />
							{errors.confirmPassword}
						</p>
					)}
					<div className="SignupForm__submit">
						<span>
							<button onClick={handleClick}>{"<"} Back</button>
						</span>
						<span>
							<button type="submit">Sign Up</button>
						</span>
					</div>
				</div>
			)}
		</form>
	);
}

export default SignupFormModal;
