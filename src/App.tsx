import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainToDo from "./pages/todoapp/MainToDo";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainToDo/>}/>
      </Routes>
    </div>
  );
};

export default App;
