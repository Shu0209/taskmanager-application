import Home from "./Pages/Home"
import AllTasks from "./Pages/AllTasks"
import CompletedTasks from "./Pages/CompletedTasks"
import ImportantTasks from "./Pages/ImportantTasks"
import IncompletedTasks from "./Pages/IncompletedTasks"
import Signup from "./Pages/Signup.jsx"
import Login from "./Pages/Login.jsx"
import { useDispatch, useSelector } from "react-redux"

import { BrowserRouter as Router,Routes,Route, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { authActions } from "./store/auth.jsx"

function App() {
  const [Hamburger,setHamburger]=useState("hidden")

  function ClickHamburger(data){
setHamburger(data)
  }

  function ClickCancel(data){
    setHamburger(data)
  }


  const navigate=useNavigate();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  const dispatch=useDispatch();
  useEffect(()=>{
if(localStorage.getItem("id")&&localStorage.getItem("token")){
  dispatch(authActions.login());
}
    else if(isLoggedIn==false){
      navigate("/Login");
    }
  },[]);
  return(
    <>
    <div className="">
    
      <Routes>
        <Route exact path="/" element={<Home Hamburger={Hamburger} setHamburger={setHamburger}/>}>
        <Route index element={<AllTasks ClickHamburger={ClickHamburger}/>} />
        <Route path="/importantTasks" element={<ImportantTasks ClickHamburger={ClickHamburger}/>}/>
        <Route path="/completedTasks" element={<CompletedTasks ClickHamburger={ClickHamburger}/>}/>
        <Route path="/incompletedTasks" element={<IncompletedTasks ClickHamburger={ClickHamburger}/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    
    </div>
    </>
  )
}

export default App
