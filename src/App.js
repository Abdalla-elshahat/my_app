import { createContext, useState } from "react";
import "./App.css";
import Main from "./main";

// إنشاء السياق
export const EmailContext = createContext();

function App() {
  const [email, Setemail] = useState("");

  return (
    <EmailContext.Provider value={{ email, Setemail }}>
      <div className="App">
        <Main />
      </div>
    </EmailContext.Provider>
  );
}

export default App;
