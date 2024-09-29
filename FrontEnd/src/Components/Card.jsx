import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import axios from "axios";


function Card({ home,addTask, setAddTaskDiv, data=[],setUpdatedData}) {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const handleComplete=async(id)=>{
try {
    await axios.put(`http://localhost:1000/api/v2/update-complete-task/${id}`,{},{headers}
    );

    
} catch (error) {
    console.log(error)
}
    }

    const handleImportant=async(id)=>{
        try {
            await axios.put(`http://localhost:1000/api/v2/update-imp-task/${id}`,{},
                {headers}
            );
            
        } catch (error) {
            console.log(error)
        }
            }

            const handleDelete=async(id)=>{
                try {
                    const response=await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`,
                        {headers}
                    );
                console.log(response.data.message)
                    
                } catch (error) {
                    console.log(error)
                }
                    }

                    const handleUpdate=(id,title,desc)=>{
                        setAddTaskDiv("fixed")
                        setUpdatedData({id:id ,title:title,desc:desc})

                    }

                   

    return (
        <div className="h-[83vh] overflow-x-auto rounded-3xl">
            <div className="grid grid-cols-2 p-2 gap-4 sm:grid-cols-3">
                {data.map((item, index) => (
                    item &&
                    <div key={index} className="bg-gray-700 p-2 rounded-xl flex flex-col justify-between xl:p-4">
                        <div>
                            <h1 className="font-bold underline mb-2 sm:mb-5 ">{item.title}</h1>
                            <p className="text-gray-400">{item.desc}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={()=>handleComplete(item._id)} className={` ${item.complete == false ? "bg-red-500" : "bg-green-500"} p-1 rounded-xl my-2 text-xs sm:text-base`}>{item.complete==true?"Completed":"Incompleted"}</button>
                            <div className=" w-full p-1 text-sm sm:text-2xl flex justify-around ">
                                <button onClick={()=>handleImportant(item._id)}>{item.important==true?<FcLike />:<CiHeart/>}</button>
                                {
                                    home !=="false"&&(
                                        <button onClick={()=>handleUpdate(item._id,item.title,item.desc)}><TbEdit /></button>
                                    )

                                }
                                
                                <button onClick={()=>handleDelete(item._id)}><MdDelete /></button>
                            </div>
                        </div>
                    </div>

                ))}

                {addTask == "true" && (
                    <div onClick={() => setAddTaskDiv("fixed")} className="bg-gray-700 rounded-xl flex flex-col justify-center items-center hover:scale-105 cursor-pointer transition-all duration-1000">
                        <button className="bg-gray-500 text-7xl rounded-full m-2 "><IoAdd /></button>
                        <h1 className="text-xl font-bold p-2">Add Task</h1>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Card 