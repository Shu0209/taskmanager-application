import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {authActions} from "../store/auth"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

function Login() {
    const history=useNavigate();

    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    const [Data, setData] = useState({ username: "", email: "", password: "" })
    useEffect(()=>{
        if(isLoggedIn==true){
            history("/");
          }
    },[isLoggedIn,history])
    

   

   
    const dispatch=useDispatch();

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value })
    }

    const submit = async () => {
        try {
            if (Data.username === "" || Data.password === "") {
                alert("All field are required");
            }
            else {
                const response = await axios.post("https://taskmanager-application-1.onrender.com/api/v1/log-in", Data);
                setData({ username: "", email: "", password: "" })
                localStorage.setItem("id",response.data.id);
                localStorage.setItem("token",response.data.token);
                dispatch(authActions.login());
                history("/")
            }
        } catch (error) {
            alert(error);
        }

    }

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-gray-500 to-gray-800 ">
                <div className="relative w-3/4 h-3/4 rounded-3xl bg-gray-600 text-white p-4 shadow-2xl lg:w-1/4">
                    <div className="flex flex-col">
                        <h1 className="text-center font-bold text-4xl m-3">
                            Login
                            </h1>
                        <p className="my-5 mx-2">
                            Username:
                            </p>
                        <input 
                        type="text" 
                        name="username"
                        value={Data.username}
                        onChange={change}
                        className="bg-gray-500 rounded-xl p-1 m-1" 
                        />
                        <p className="my-5 mx-2">
                            Password:
                            </p>
                        <input 
                        type="password" 
                        name="password"
                        value={Data.password}
                        onChange={change}
                        className="bg-gray-500 rounded-xl p-1 m-1" 
                        />
                    </div>
                   
                        <div className="flex justify-center my-8">
                        <button onClick={submit} className="bg-purple-600 px-3 py-2 font-bold rounded-2xl w-1/2 hover:bg-purple-700">
                        Login
                        </button>
                        </div>
                        <div className="flex justify-center">
                        <span>Not have an account ? &nbsp;</span>
                        <Link to="/signup" className="text-blue-500 hover:underline">Signup </Link>
                        </div>
                        
                    
                </div>


            </div>
        </>
    )
}
export default Login