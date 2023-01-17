import "./PoemsList.css";

export default function PoemsList(props) {
   const {
      poemTitle,
      poemsTitlesList,
      onPoemSelectClick,
      onDeletePoemClick,
      onEditSelectedPoemClick,
   } = props;

   return (
      <main id="poems-list-main">
         <div id="poems-list-wrapper">
            <div id="poems-list">
               <ul>
                  {poemsTitlesList.map((poem) => {
                     return (
                        <li key={poem} onClick={onPoemSelectClick}>
                           {poem}
                        </li>
                     );
                  })}
               </ul>
            </div>
            <div id="poems-list-selection">
               {poemTitle && (
                  <div className="poems-list-selection-wrapper">
                     <h2>{poemTitle}</h2>
                     <div className="poems-list-btn-wrapper">
                        <button
                           onClick={onDeletePoemClick}
                           className="save-btn"
                        >
                           Șterge poezia
                        </button>
                        <button
                           onClick={onEditSelectedPoemClick}
                           className="save-btn"
                        >
                           Editează
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </main>
   );
}
