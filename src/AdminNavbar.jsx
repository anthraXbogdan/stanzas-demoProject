import { NavLink, Outlet } from "react-router-dom";

export default function AdminNavbar(props) {
	const { onLogoutClick } = props;

	return (
		<>
			<nav id="admin-navbar">
				<div className="navbar-logo">
					<h1>Project Eminescu</h1>
					<h2>Dashboard</h2>
				</div>
				<div>
					<ul>
						<li className="nav-item">
							<NavLink
								className={({ isActive }) => (isActive ? "active" : "")}
								to=""
								end
							>
								Editor
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className={({ isActive }) => (isActive ? "active" : "")}
								to="poemsList"
							>
								Listă
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/">Acasă</NavLink>
						</li>
						<li className="nav-item" onClick={onLogoutClick}>
							Log out
						</li>
					</ul>
				</div>
			</nav>
			<Outlet />
		</>
	);
}
