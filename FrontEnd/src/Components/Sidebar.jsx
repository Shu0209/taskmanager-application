import { GrNotes } from "react-icons/gr";
import { MdLabelImportant } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { TfiWrite } from "react-icons/tfi";
import { NavLink, useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Sidebar(props) {
    const dispatch = useDispatch();
    const history = useNavigate();
    const data = [{
        title: "All Tasks",
        icons: <GrNotes />,
        link: "/"
    },
    {
        title: "Important Tasks",
        icons: <MdLabelImportant />,
        link: "/importantTasks"
    },
    {
        title: "Completed Tasks",
        icons: <TiTick />,
        link: "/completedTasks"
    },
    {
        title: "Incompleted Tasks",
        icons: <TfiWrite />,
        link: "/incompletedTasks"
    }

    ]

    const [Data, setData] = useState();

    const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("/Login")
    }
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks",
                { headers }
            );
            setData(response.data.data);
        };
        if(localStorage.getItem("id") && localStorage.getItem("token")){
        fetch();
    }
    })

    return (
        <>


            {
                Data && <div className="flex gap-4 justify-between relative"><h1 className="font-bold text-2xl">{Data.username}<hr></hr></h1>
                    <button onClick={() => props.clickCancel("hidden")} className="text-2xl m-2 sm:text-4xl xl:hidden" ><MdCancel /></button>
                </div>}



            <div className="">
                {data.map((item, index) => (
                    <NavLink to={item.link} key={index} className="my-5 h-10 flex items-center gap-3 cursor-pointer hover:font-bold hover:bg-slate-400 rounded-2xl p-2 active:border-2 active:border-white">{item.icons}{item.title}</NavLink>
                )
                )}
            </div>
            <div className="absolute bottom-10"><button className="bg-gray-500 w-36 text-xl font-bold m-2 h-10 rounded-2xl hover:bg-gray-600 lg:w-40" onClick={logout}>Logout</button></div>


        </>
    )
}
export default Sidebar