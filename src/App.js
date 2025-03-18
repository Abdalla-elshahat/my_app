import { createContext, useState } from "react";
import "./App.css";
import Main from "./main";
import { token } from "./utels/consts";
import { useNavigate } from "react-router-dom";
import { SavedPostsProvider } from "./Contexts/SavedPostsContext";
export const EmailContext = createContext();

function App() {
  const [email, Setemail] = useState("");
  // const nav=useNavigate();
  // if(!token){
  //    nav("/signup"||"/login")
  // }
  return (
    <EmailContext.Provider value={{ email, Setemail }}>
       <SavedPostsProvider>
      <div className="App">
        <Main />
      </div>
      </SavedPostsProvider>
    </EmailContext.Provider>
  );
}

export default App;
