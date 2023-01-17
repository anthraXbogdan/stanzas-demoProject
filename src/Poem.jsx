import { useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Poem() {
   const params = useParams();
   const currentPoem = useOutletContext();
   const [stanzas, setStanzas] = useState([]);

   useEffect(() => {
      setStanzas([]);
      if (currentPoem.length > 0) {
         setStanzas(currentPoem[0].stanzas);
      }
   }, [currentPoem]);

   useEffect(() => {
      localStorage.setItem("currentReadingTitle", params.title);
   }, [params.title]);

   return (
      <div id="poem-container">
         <header>
            <h2>{params.title}</h2>
         </header>
         <div className="stanza-wrapper">
            {stanzas.map((stanza) => {
               return (
                  <div key={stanza.stanzaNumber}>
                     <pre className="stanza-body">{stanza.stanzaText}</pre>
                  </div>
               );
            })}
            <footer>Sfârșit</footer>
         </div>
      </div>
   );
}
