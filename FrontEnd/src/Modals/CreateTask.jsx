import axios from "axios";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";


const CreateTask=({ addTaskDiv, setAddTaskDiv,UpdatedData,setUpdatedData})=>{
    const [Data,setData]=useState({
        title:"",
        desc:"",
    });

useEffect(()=>{
    setData({title:UpdatedData.title,desc:UpdatedData.desc})
},[UpdatedData])

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    


    const change=(e)=>{
const {name,value}=e.target;
setData({...Data,[name]:value})
    }

const submitData=async()=>{
if(Data.title===""||Data.desc===""){
    alert("All fields are required");
}
else {
    try {
        await axios.post("http://localhost:1000/api/v2/create-task", Data, {
            headers,
        });
        alert("Task created successfully");
        setAddTaskDiv("hidden"); // Close modal
        setData({ title: "", desc: "" }); // Clear form
    } catch (error) {
        console.error("Error creating task:", error);
    }
}
}

const updateTask=async()=>{

    if(Data.title===""||Data.desc===""){
        alert("All fields are required");
    }
    else {
        try {
            await axios.put(`http://localhost:1000/api/v2/update-task/${UpdatedData.id}`, Data, {
                headers,
            });
            alert("Task Updated successfully");
            setAddTaskDiv("hidden"); // Close modal
            setData({ title: "", desc: "" }); // Clear form
        } catch (error) {
            console.error("Error creating task:", error);
        }
    }

}
    return (
        <>
            <div className={` ${addTaskDiv} absolute top-0 left-0 backdrop-blur-sm w-screen h-screen flex justify-center items-center`}>
                <div className="bg-gray-600 w-1/2 rounded-3xl p-2 xl:w-1/4">
                    <div onClick={() => 
                        {setAddTaskDiv("hidden"); 
                        setUpdatedData({
                            id:"",
                            title:"",
                            desc:"",
                            });
                            setData({
                                title:"",
                                desc:"",
                            })
                            }} 
                            className="flex justify-end text-4xl">
                                <p><MdCancel /></p>
                                </div>

                    <h1 className="text-center text-xl font-bold m-1 xl:text-4xl">Add Task</h1>

                    <p className="text-xl m-2">Topic:</p>

                    <input type="text" name="title" value={Data.title} onChange={change} className="bg-gray-500 m-2 p-2 rounded-xl w-1/2 xl:w-1/2" />

                    <p className="text-xl m-2">Description:</p>

                    <textarea name="desc" value={Data.desc} onChange={change} className="bg-gray-500 rounded-xl m-2 p-2 w-5/6"></textarea>

                    <div className="flex justify-end mx-5 gap-5">
                        {UpdatedData.id==""?( <button  onClick={submitData} className="bg-purple-600 p-2 rounded-xl w-20 font-bold text-xl">Add</button>):(   <button  onClick={updateTask} className="bg-purple-600 p-2 rounded-xl w-20 font-bold text-xl">Update</button>)}
                   
                     
                        <button
                         onClick={() => {
                            setAddTaskDiv("hidden");
                            setUpdatedData({
                                id:"",
                                title:"",
                                desc:"",
                                });
                                setData({
                                    title:"",
                                    desc:"",
                                })

                        }} className="bg-gray-300 p-2 rounded-xl w-20 font-semibold text-gray-600 text-xl">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateTask