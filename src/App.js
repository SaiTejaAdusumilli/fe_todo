import './App.css';
import React from "react";
import Modal from './components/modal';
import Todo from './components/todo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>TODO APP</h1>
    <Routes>
    <Route exact path="/" element={<Todo />} />
    <Route exact path="/edit" element={<Modal/>} />
    </Routes>
  </div>
  </BrowserRouter>
  );
}

export default App;
