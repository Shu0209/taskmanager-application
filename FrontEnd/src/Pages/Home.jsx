import { Outlet } from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import AllTasks from "./AllTasks"

import { useState } from "react"





function Home({Hamburger,setHamburger}){
    function clickCancel(data){
        setHamburger(data)
    }
  
return(
    <>
    <div className="flex  h-screen gap-7 bg-gray-700 text-white p-0 relative xl:p-8">
        <div className={`flex-col justify-between bg-gray-800 rounded-xl shadow-2xl p-4 w-1/2 h-[94vh] relative z-10 ${Hamburger} xl:block xl:w-1/5 `}><Sidebar clickCancel={clickCancel}/></div>
        <div className="bg-gray-800 rounded-xl shadow-2xl w-[100vw] h-[100vh] p-2 absolute xl:w-4/5 xl:h-[94vh] xl:static"><Outlet/></div>
        
    </div>
    
    
    </>
)
}
export default Home