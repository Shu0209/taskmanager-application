import Card from "../Components/Card"
import { IoAdd } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

import CreateTask from "../Modals/CreateTask";
import { useState,useEffect } from "react";
import axios from "axios";

function AllTasks(props) {
const [addTaskDiv,setAddTaskDiv]=useState("hidden")
const [Data, setData] = useState();

const [UpdatedData,setUpdatedData]=useState({
    id:"",
    title:"",
    desc:"",
})


const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
};

useEffect(()=>{
    const fetch = async () => {
        try{
        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks",
            { headers }
        );
        setData(response.data.data);
    }
    catch(error){
        console.error("Error featching")
    }
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")){
fetch();
    }
     
})


    return (
        <>

            <div className="flex m-4 relative h-4">
                <button onClick={()=>props.ClickHamburger("fixed")} className="xl:hidden"><GiHamburgerMenu /></button>
                
                <button onClick={()=>setAddTaskDiv("fixed")} className="bg-slate-600 rounded-full text-2xl p-1 hover:bg-gray-400 hover:text-black absolute right-0"><IoAdd /></button>
                
                
            </div>

            <div>
                {Data&&<Card addTask={"true"} setAddTaskDiv={setAddTaskDiv} data={Data.task} setUpdatedData={setUpdatedData}/>}
            </div>
            <CreateTask addTaskDiv={addTaskDiv} setAddTaskDiv={setAddTaskDiv} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData} />
        </>
    )
}
export default AllTasks