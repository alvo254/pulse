import './App.css';
import { useEffect, useState } from 'react';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav/Nav"
import Dashboard from './components/Dashboard/Dashboard';


function App() {

  const [user, setUser] = useState(null)


  useEffect(() => {
    fetch("")
    .then((r) => {
      if(r.ok){
        r.json().then((user) => setUser(user))
      }
    })
  },[])


  return (
    <BrowserRouter>

        <Nav/>

        <Routes>
            <Route path='/' element={<Dashboard />} />
        </Routes>

    </BrowserRouter>

  );
}

export default App;
