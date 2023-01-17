import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminNavbar from "./AdminNavbar";

export default function Admin() {
	const navigate = useNavigate();

	const handleLogoutClick = (e) => {
		e.preventDefault();

		const auth = getAuth();
		signOut(auth)
			.then(() => {
				navigate("/login");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			<AdminNavbar onLogoutClick={handleLogoutClick}></AdminNavbar>
		</>
	);
}
