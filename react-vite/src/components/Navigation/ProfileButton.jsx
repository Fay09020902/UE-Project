import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useNavigate } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton() {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const user = useSelector((store) => store.session.user);
	const ulRef = useRef();

	const navigate = useNavigate();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const logout = (e) => {
		e.preventDefault();
		dispatch(thunkLogout());
		closeMenu();

		navigate("/");
	};

	return (
		<div className="left_menubar">
			<FaUserCircle className="user-ico" onClick={toggleMenu} />

			{showMenu && (
				<ul className={"profile-dropdown"} ref={ulRef}>
					{user ? (
						<>
							<li className="profile-img">
								<span>
									<i className="fa-solid fa-user fa-2x"></i>
								</span>
								<div>
									<div>{user.username}</div>
									<NavLink
										to={`/myaccountpage`}
										className="my-account"
										onClick={toggleMenu}
									>
										<div>Manage Account</div>
									</NavLink>
								</div>
							</li>
							<li>Orders</li>
							<li>Favorites</li>
							<li>Wallet</li>
							<li>Meal plan</li>
							<li>Help</li>
							<li>Promotions</li>
							<li className="uber1">
								<span>
									<i className="fa-regular fa-circle"></i>
								</span>
								<div>
									<div>Uber One</div>
									<div>Try free for 4 weeks</div>
								</div>
							</li>
							<li className="invitefriends">
								<span>
									<i className="fa-solid fa-gift"></i>
								</span>
								<div>
									<div>Invite friends</div>
									<div>You get $15 off</div>
								</div>
							</li>
							<li>
								<button onClick={logout}>Log Out</button>
							</li>
							<hr />
							<li>
								<div className="addnewrestaurant">
									<div>
										<NavLink
											to={""}
											style={{ textDecoration: "none" }}
											onClick={toggleMenu}
										>
											Create a business account
										</NavLink>
									</div>
									<div>
										<NavLink
											to={"restaurants/addyourrestaurant"}
											style={{ textDecoration: "none" }}
											onClick={toggleMenu}
										>
											Add your restaurant
										</NavLink>
									</div>
									<div>
										<NavLink
											to={""}
											style={{ textDecoration: "none" }}
											onClick={toggleMenu}
										>
											Sign up to deliver
										</NavLink>
									</div>
								</div>
							</li>
							<li>
								<div>
									<div className="uberlogo">
										<img
											src="./ubereat.svg"
											alt="Uber eats"
											style={{ width: "35px" }}
										/>
										<p>There&apos;s more to love in the app.</p>
									</div>
									<div className="iphone_android">
										<p>
											<i className="fa-brands fa-apple"></i>
											<span>iPhone</span>
										</p>
										<p>
											<i className="fa-solid fa-robot"></i>
											<span>Android</span>
										</p>
									</div>
								</div>
							</li>
						</>
					) : (
						<>
							<div className="sl">
								<OpenModalMenuItem
									itemText="Sign Up"
									onItemClick={closeMenu}
									modalComponent={<SignupFormModal />}
								/>
								<OpenModalMenuItem
									itemText="Log In"
									onItemClick={closeMenu}
									modalComponent={<LoginFormModal />}
								/>
							</div>

							<li>
								<div className="addnewrestaurant">
									<span>
										<NavLink
											to={"restaurants/addyourrestaurant"}
											style={{ textDecoration: "none" }}
											onClick={toggleMenu}
										>
											Add your restaurant
										</NavLink>
									</span>
									<span>
										<NavLink
											to={""}
											style={{ textDecoration: "none" }}
											onClick={toggleMenu}
										>
											Sign up to deliver
										</NavLink>
									</span>
									<span>
										<NavLink
											to={""}
											style={{ textDecoration: "none" }}
											onClick={toggleMenu}
										>
											Create a business account
										</NavLink>
									</span>
								</div>
							</li>
							<li className="fixedbottom">
								<div>
									<div className="uberlogo">
										<img
											src="./ubereat.svg"
											alt="Uber eats"
											style={{ width: "35px" }}
										/>
										<p>There&apos;s more to love in the app.</p>
									</div>
									<div className="iphone_android">
										<p>
											<i className="fa-brands fa-apple"></i>
											<span>iPhone</span>
										</p>
										<p>
											<i className="fa-solid fa-robot"></i>
											<span>Android</span>
										</p>
									</div>
								</div>
							</li>
						</>
					)}
				</ul>
			)}
		</div>
	);
}

export default ProfileButton;
