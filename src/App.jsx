import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from './components/Login&Signup/login'
import Signup from './components/Login&Signup/signup'
export default function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
     
    <Route index element={<Signup/>}/>
    <Route path="/signup" element = {<Signup/>}/>
    <Route path="/login" element = {<Login/>}/>

    </Routes>
      
    </BrowserRouter>
  
    </div>
  );
}
