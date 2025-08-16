import React from "react";
import Navbar from "./Components/Navbar";
import Firstpage from "./Pages/Firstpage";
import { Routes, Route } from "react-router-dom";
import Editorpage from "./Pages/Editorpage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <Firstpage />
            </div>
          }
        />

        <Route path="/editor" element={<Editorpage />} />
      </Routes>
    </div>
  );
};

export default App;
