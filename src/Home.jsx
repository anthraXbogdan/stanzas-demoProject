import "./Home.css";
import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";

export default function Home(props) {
   const navigate = useNavigate();
   const {
      currentReadingTitle,
      homeDrawerOpen,
      poemsList,
      onMenuIconClick,
      onPoemTitleClick,
      onCloseBtnClick,
   } = props;
   const [currentPoem, setCurrentPoem] = useState(() => {
      return JSON.parse(localStorage.getItem("currentPoem")) ?? {};
   });

   useEffect(() => {
      const poem = poemsList.filter((poem) => {
         return poem.title === currentReadingTitle;
      });
      setCurrentPoem(poem);
      localStorage.setItem("currentPoem", JSON.stringify(poem));

      window.scrollTo(0, 0);
   }, [currentReadingTitle]);

   const handleLogoClick = () => {
      navigate("/");
   };

   return (
      <div>
         <div className={`home-drawer ${homeDrawerOpen ? "open-drawer" : ""}`}>
            <div className="close-btn-wrapper">
               <span
                  className="material-symbols-outlined"
                  onClick={onCloseBtnClick}
               >
                  arrow_back
               </span>
            </div>
            <ul>
               {poemsList.map((poem) => {
                  return (
                     <Link to={`/${poem.title}`}>
                        <li key={poem.title} onClick={onPoemTitleClick}>
                           {poem.title}
                        </li>
                     </Link>
                  );
               })}
            </ul>
         </div>

         <main className={`home-main ${homeDrawerOpen ? "opaque" : ""}`}>
            <nav id="home-nav">
               <div className="menu-icon-container" onClick={onMenuIconClick}>
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
               </div>
               <div className="logo-container">
                  <h1 onClick={handleLogoClick}>Project Eminescu</h1>
               </div>
            </nav>
            <Outlet context={currentPoem} />
         </main>
      </div>
   );
}
