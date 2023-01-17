import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
   getFirestore,
   collection,
   doc,
   setDoc,
   getDocs,
   deleteDoc,
} from "firebase/firestore";

import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";
import PoemEditor from "./PoemEditor";
import PoemsList from "./PoemsList";
import ProtectedRoute from "./ProtectedRoute";
import StanzaEditor from "./StanzaEditor";
import HomeBackground from "./HomeBackground";
import Poem from "./Poem";

const firebaseConfig = {
   apiKey: "AIzaSyDaX0pGTlB9Tv8IO8qLiPk2X8rQ6Vvvb00",
   authDomain: "stanzas-a7881.firebaseapp.com",
   projectId: "stanzas-a7881",
   storageBucket: "stanzas-a7881.appspot.com",
   messagingSenderId: "757986552254",
   appId: "1:757986552254:web:24b375636606e938eaf1ef",
};

// Initialize Firebase
const stanzas = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(stanzas);
const poems = collection(db, "stanzasPoems");

function App() {
   const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [stanzaNumber, setStanzaNumber] = useState(1);
   const [stanzaText, setStanzaText] = useState("");
   const [stanzas, setStanzas] = useState([]);
   const [title, setTitle] = useState("");
   const [savedTitle, setSavedTitle] = useState("");
   const [poem, setPoem] = useState({});
   const [flag, setFlag] = useState(false);
   const [poemsTitlesList, setPoemsTitlesList] = useState([]);
   const [poemsList, setPoemsList] = useState(() => {
      return JSON.parse(localStorage.getItem("poemsList")) ?? [];
   });
   const [poemTitle, setPoemTitle] = useState("");
   const [poemId, setPoemId] = useState("noId");
   const [currentReadingTitle, setCurrentReadingTitle] = useState(() => {
      return localStorage.getItem("currentReadingTitle") ?? "";
   });
   const [homeDrawerOpen, setHomeDrawerOpen] = useState(false);

   const handleLoginClick = (e) => {
      e.preventDefault();

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setUsername(user.email);
            navigate("/admin");
            console.log(`User email: ${user.email}`);
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Please try again");
            console.log(errorCode, errorMessage);
         });
   };

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
   };

   const handlePasswordChange = (e) => {
      setPassword(e.target.value);
   };

   // Add a poem to db
   const addPoem = async () => {
      try {
         await setDoc(doc(db, "stanzasPoems", savedTitle), poem);
      } catch (error) {
         console.error("Error adding document: ", error);
      } finally {
         setFlag(false);
         setTitle("");
         setSavedTitle("");
      }
   };

   const handleSavePoemClick = () => {
      setPoem({ title: savedTitle, stanzas: stanzas });
      setFlag(true);
      setStanzas([]);
      setStanzaNumber(1);
   };

   useEffect(() => {
      if (flag) {
         addPoem();
      }
   }, [poem]);

   // Get a list of all poems from db
   const getPoemsList = async () => {
      const querySnapshot = await getDocs(poems);
      const titlesList = [];
      const list = [];
      querySnapshot.forEach((doc) => {
         titlesList.push(doc.data().title);
         list.push(doc.data());
      });
      setPoemsTitlesList(titlesList);
      setPoemsList(list);
      localStorage.setItem("poemsList", JSON.stringify(list));
   };

   useEffect(() => {
      if (!flag || poemId === "") {
         getPoemsList();
      }
   }, [flag, poemId]);

   // Delete a poem from db
   const deletePoem = async (id) => {
      try {
         await deleteDoc(doc(db, "stanzasPoems", id));
      } catch (error) {
         console.error("Error deleteting document: ", error);
      } finally {
         setPoemTitle("");
         setPoemId("");
      }
   };

   const handleDeletePoemClick = async () => {
      setPoemId(poemTitle);
   };

   useEffect(() => {
      deletePoem(poemId);
   }, [poemId]);

   const handleTitleChange = (e) => {
      setTitle(e.target.value);
   };

   const handleSaveTitleClick = () => {
      setSavedTitle(title);
   };

   const handleTextChange = (e) => {
      let text = ``;
      text = e.target.value;
      setStanzaText(text);
   };

   const handleSaveStanzaCLick = () => {
      setStanzaNumber((preStanzaNumber) => preStanzaNumber + 1);
      setStanzas([
         ...stanzas,
         { stanzaNumber: stanzaNumber, stanzaText: stanzaText },
      ]);
      setStanzaText("");
   };

   const handleSaveEditedStanzaClick = (id, text) => {
      const updatedStanzas = stanzas.map((stanza) => {
         if (stanza.stanzaNumber === id) {
            return { ...stanza, stanzaText: text };
         }
         return stanza;
      });
      setStanzas(updatedStanzas);
      navigate("/admin");
   };

   const handleDeleteLastStanzaClick = () => {
      setStanzas(stanzas.slice(0, stanzas.length - 1));
      setStanzaNumber((preStanzaNumber) => preStanzaNumber - 1);
   };

   const handleDeleteAllStanzasClick = () => {
      setStanzas([]);
      setStanzaNumber(1);
   };

   const handlePoemSelectClick = (e) => {
      setPoemTitle(e.target.textContent);
   };

   const handleEditSelectedPoemClick = () => {
      const editablePoem = poemsList.find((poem) => {
         return poem.title === poemTitle;
      });

      setTitle(editablePoem.title);
      setSavedTitle(editablePoem.title);
      setStanzas(editablePoem.stanzas);
      setStanzaNumber(editablePoem.stanzas.length + 1);

      navigate("/admin");
   };

   const handlePoemTitleClick = (e) => {
      setCurrentReadingTitle(e.target.textContent);
      setHomeDrawerOpen(false);
   };

   const handleCloseBtnClick = (e) => {
      setHomeDrawerOpen(false);
   };

   const handleMenuIconClick = () => {
      setHomeDrawerOpen(true);
   };

   return (
      <Routes>
         <Route
            path="/"
            element={
               <Home
                  currentReadingTitle={currentReadingTitle}
                  homeDrawerOpen={homeDrawerOpen}
                  poemsList={poemsList}
                  onPoemTitleClick={handlePoemTitleClick}
                  onMenuIconClick={handleMenuIconClick}
                  onCloseBtnClick={handleCloseBtnClick}
               />
            }
         >
            <Route path="" element={<HomeBackground to="" />}></Route>
            <Route path=":title" element={<Poem />}></Route>
         </Route>
         <Route
            path="/login"
            element={
               <Login
                  username={username}
                  email={email}
                  password={password}
                  onEmailChange={handleEmailChange}
                  onPasswordChange={handlePasswordChange}
                  onLoginClick={handleLoginClick}
               ></Login>
            }
         ></Route>
         <Route element={<ProtectedRoute username={username} />}>
            <Route path="/admin" element={<Admin />}>
               <Route
                  path=""
                  element={
                     <PoemEditor
                        to=""
                        stanzaText={stanzaText}
                        stanzas={stanzas}
                        title={title}
                        savedTitle={savedTitle}
                        onTitleChange={handleTitleChange}
                        onSaveTitleClick={handleSaveTitleClick}
                        onTextChange={handleTextChange}
                        onSaveStanzaClick={handleSaveStanzaCLick}
                        onSavePoemClick={handleSavePoemClick}
                        onDeleteLastStanzaClick={handleDeleteLastStanzaClick}
                        onDeleteAllStanzasClick={handleDeleteAllStanzasClick}
                     />
                  }
               ></Route>
               <Route
                  path="poemsList"
                  element={
                     <PoemsList
                        poemsTitlesList={poemsTitlesList}
                        poemTitle={poemTitle}
                        onEditSelectedPoemClick={handleEditSelectedPoemClick}
                        onPoemSelectClick={handlePoemSelectClick}
                        onDeletePoemClick={handleDeletePoemClick}
                     />
                  }
               ></Route>
            </Route>
            <Route
               path="/admin/:id"
               element={
                  <StanzaEditor
                     stanzas={stanzas}
                     onSaveEditedStanzaClick={handleSaveEditedStanzaClick}
                  />
               }
            ></Route>
         </Route>

         <Route path="*" element={<p>There's nothing here: 404!</p>}></Route>
      </Routes>
   );
}

export default App;
