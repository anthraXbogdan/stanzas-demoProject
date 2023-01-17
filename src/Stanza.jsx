import { Link } from "react-router-dom";

export default function Stanza(props) {
	const { stanzaNumber, stanza } = props;

	return (
		<div className="stanza">
			<h3 className="stanza-title">Strofa {stanzaNumber}</h3>
			<Link to={`/admin/${stanzaNumber}`}>
				<div>
					<pre className="stanza-body">{stanza}</pre>
				</div>
			</Link>
		</div>
	);
}
