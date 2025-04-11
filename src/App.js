import { createContext, useState } from "react";
import "./App.css";
import Main from "./main";
import { token } from "./utels/consts";
import { useNavigate } from "react-router-dom";
import { SavedPostsProvider } from "./Contexts/SavedPostsContext";
import { LearningDataProvider } from "./Contexts/LearningData";
export const EmailContext = createContext();

function App() {
  const [email, Setemail] = useState("");
  // const nav=useNavigate();
  // if(!token){
  //    nav("/signup"||"/login")
  // }
  return (
    <EmailContext.Provider value={{ email, Setemail }}>
    <LearningDataProvider>
       <SavedPostsProvider>
      <div className="App">
        <Main />
      </div>
      </SavedPostsProvider>
      </LearningDataProvider>
    </EmailContext.Provider>
  );
}

export default App;
