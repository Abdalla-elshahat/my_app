import { createContext, useEffect, useState } from "react";
import "./App.css";
import Main from "./main";
import { SavedPostsProvider } from "./Contexts/SavedPostsContext";
import { LearningDataProvider } from "./Contexts/LearningData";
import GoogleScriptLoader from "./GoogleScriptLoader";
export const EmailContext = createContext();
function App() {
  const [email, Setemail] = useState("");
  return (
    <EmailContext.Provider value={{ email, Setemail }}>
    <LearningDataProvider>
       <SavedPostsProvider>
      <div className="App">
        <GoogleScriptLoader/>
        <Main />
      </div>
      </SavedPostsProvider>
      </LearningDataProvider>
    </EmailContext.Provider>
  );
}

export default App;
