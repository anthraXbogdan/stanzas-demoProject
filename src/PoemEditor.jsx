import Stanza from "./Stanza";

export default function PoemEditor(props) {
	const {
		stanzaText,
		stanzas,
		title,
		savedTitle,
		onTitleChange,
		onSaveTitleClick,
		onTextChange,
		onSaveStanzaClick,
		onSavePoemClick,
		onDeleteLastStanzaClick,
		onDeleteAllStanzasClick,
	} = props;

	return (
		<main id="poem-editor-main">
			<section className="poem-editor-main-section stanzas-input">
				<div className="section-widget">
					<div id="stanza-input-head">
						<h2>
							<span className="title-accent-bar">III</span>Poezie nouă
						</h2>
						<label htmlFor="poem-title" id="poem-title-label">
							Titlul poeziei:
						</label>
						<div id="poem-title-widget">
							<input
								type="text"
								id="poem-title-text"
								value={title}
								spellCheck="false"
								onChange={onTitleChange}
							/>
							<button className="save-btn" onClick={onSaveTitleClick}>
								Salvează titlul
							</button>
						</div>
						<div id="stanza-text-label">
							<label htmlFor="stanza-text">Textul strofei:</label>
						</div>
					</div>
					<textarea
						name="stanza-text"
						id="stanza-text"
						cols="30"
						rows="10"
						spellCheck="false"
						value={stanzaText}
						onChange={onTextChange}
					></textarea>
					<div className="save-stanza-btn-area">
						<button
							className="save-btn"
							id="save-stanza-btn"
							onClick={onSaveStanzaClick}
						>
							Salvează textul strofei
						</button>
					</div>
				</div>
			</section>

			<section className="poem-editor-main-section stanzas-view">
				<div className="section-widget">
					<div id="stanzas-view-head">
						<h2>
							<span className="title-accent-bar">III</span>Previzualizare poezie
						</h2>
						<p id="poem-title">
							Titlu<span className="title-accent-bar">: </span>
							<span className="poem-name">{savedTitle}</span>
						</p>
					</div>
					<div id="stanza-carousel" tabIndex="-1">
						{stanzas
							.map((stanza) => {
								return (
									<Stanza
										key={stanza.stanzaNumber}
										stanzaNumber={stanza.stanzaNumber}
										stanza={stanza.stanzaText}
									></Stanza>
								);
							})
							.reverse()}
					</div>
					<div id="save-poem-btn-area">
						<button className="save-btn" onClick={onDeleteAllStanzasClick}>
							Șterge toate strofele
						</button>
						<button className="save-btn" onClick={onDeleteLastStanzaClick}>
							Șterge ultima strofă
						</button>
						<button
							className="save-btn"
							id="save-poem-btn"
							onClick={onSavePoemClick}
						>
							Salvează poezia
						</button>
					</div>
				</div>
			</section>
		</main>
	);
}
