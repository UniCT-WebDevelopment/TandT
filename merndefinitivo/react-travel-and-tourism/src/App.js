import Home from "./pages/home/Home";
import Register from "./pages/register/Register"
import Profile from "./pages/profile/Profile"
import Login from "./pages/login/Login"
import Place from "./pages/place/Place";
import Event from "./pages/event/Event";
import Messenger from "./pages/messenger/Messenger";
import Ristorant from "./pages/ristorant/Ristorant"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { AuthContex } from "./context/AuthContext";
 

function App() {
  const  {user} = useContext(AuthContex);
  
  return  (
    <Router>
      <Routes>
        <Route exact path='/' element={user ? <Home/> : <Login/>} />
        <Route path='/login' element={user ? <Navigate to= "/" /> : <Login/>} />
        <Route path='/register' element={user ? <Navigate to= "/" /> : <Register/>} />
        <Route path='/profile/:username' element={<Profile/>} />
        <Route path='/place' element={<Place/>}/>
        <Route path='/ristoraunt' element={<Ristorant/>}/>
        <Route path='/event' element={<Event/>}/>
        <Route path='/logout' element={<Login/>}/> 
        
        <Route path="/messenger" element= {!user ? <Navigate to="/" /> : <Messenger />}/>
          
        
        </Routes>
    </Router>
  )
}

export default App;
