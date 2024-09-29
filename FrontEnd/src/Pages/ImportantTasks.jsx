import Card from "../Components/Card"
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { useEffect, useState } from "react";



function ImportantTasks(props){
const [Data,setData]=useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    
    useEffect(()=>{
        const fetch = async () => {
            try{
            const response = await axios.get("http://localhost:1000/api/v2/get-imp-tasks",
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
export default ImportantTasks