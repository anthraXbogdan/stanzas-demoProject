import { useNavigate, Outlet } from "react-router-dom";

export default function ProtectedRoute(props) {
	const navigate = useNavigate();
	const { username, children } = props;

	if (!username) {
		navigate("/");
	} else {
		return <Outlet />;
	}
}
