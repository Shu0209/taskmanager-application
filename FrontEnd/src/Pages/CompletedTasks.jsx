import Card from "../Components/Card"
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { useState,useEffect } from "react";



function CompletedTasks(props){

    const [Data,setData]=useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    
    useEffect(()=>{
        const fetch = async () => {
            try{
            const response = await axios.get("https://taskmanager-application-1.onrender.com/api/v2/get-complete-tasks",
                { headers }
            );
            setData(response.data.data);
        }
        catch(error){
            console.error("Error featching")
        }
        };
         fetch();
    })

    
    return(
        <>
        <div className="m-2">
        <button onClick={()=>props.ClickHamburger("fixed")} className="xl:hidden"><GiHamburgerMenu /></button>
        </div>
        <div>
            <Card home={"false"} data={Data}/>
        </div>
        </>
    )
}
export default CompletedTasks