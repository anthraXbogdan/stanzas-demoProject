import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./StanzaEditor.css";

export default function StanzaEditor(props) {
	const { stanzas, onSaveEditedStanzaClick } = props;
	const [stanzaText, setStanzaText] = useState("");
	const params = useParams();

	useEffect(() => {
		const stanza = stanzas.find((stanza) => {
			return stanza.stanzaNumber === Number.parseInt(params.id, 10);
		});
		setStanzaText(stanza.stanzaText);
	}, []);

	const handleTextChange = (e) => {
		setStanzaText(e.target.value);
	};

	return (
		<main id="stanza-editor-main">
			<div id="stanza-editor-wrapper">
				<h1>Editează Strofa {params.id}</h1>

				<div className="stanza-body">
					<textarea
						name="stanza-text"
						cols="30"
						rows="10"
						spellCheck="false"
						value={stanzaText}
						onChange={handleTextChange}
					></textarea>
				</div>

				<div className="stanza-editor-btn-area">
					<button className="save-btn">
						<Link to="/admin">Înapoi</Link>
					</button>
					<button
						className="save-btn"
						onClick={() =>
							onSaveEditedStanzaClick(
								Number.parseInt(params.id, 10),
								stanzaText
							)
						}
					>
						Salvează textul strofei
					</button>
				</div>
			</div>
		</main>
	);
}
