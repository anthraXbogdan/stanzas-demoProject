import "./Login.css";

export default function Login(props) {
	const { onEmailChange, onPasswordChange, onLoginClick } = props;

	return (
		<>
			<main id="login-main">
				<section>
					<div className="login-logo-wrapper">
						<div className="navbar-logo">
							<h1>Project Eminescu</h1>
						</div>
						<div className="navbar-logo">
							<h2>Admin Login</h2>
						</div>
					</div>

					<div>
						<form id="login-form">
							<div className="login-input-wrapper">
								<label htmlFor="email-address">Adresă email</label>
								<input
									id="email-address"
									name="email"
									type="email"
									required
									placeholder="exemplu@exemplu.com"
									onChange={onEmailChange}
								/>
							</div>

							<div className="login-input-wrapper">
								<label htmlFor="password">Parolă</label>
								<input
									id="password"
									name="password"
									type="password"
									required
									placeholder="parolă"
									onChange={onPasswordChange}
								/>
							</div>

							<div className="login-btn-wrapper">
								<button className="save-btn login-btn" onClick={onLoginClick}>
									Login
								</button>
							</div>
						</form>
					</div>
				</section>
			</main>
		</>
	);
}
