import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import axios from "axios"

function Signup() {
    const history = useNavigate();
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    if(isLoggedIn==true){
        history("/");
      }

    const [Data, setData] = useState({ username: "", email: "", password: "" })

    

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value })
    }

    const submit = async () => {
        try {
            if (Data.username === "" || Data.password === "" || Data.email === "") {
                alert("All field are required");
            }
            else {
                const response = await axios.post("https://taskmanager-application-1.onrender.com/api/v1/sign-in", Data);
                setData({ username: "", email: "", password: "" })
                alert(response.data.message)
                history("/login")
            }
        } catch (error) {
            alert(error.response.data.message);
        }

    }

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-gray-500 to-gray-800 ">
                <div className="relative w-1/2 h-3/4 rounded-3xl bg-gray-600 text-white p-4 shadow-2xl lg:w-1/4">
                    <div className="flex flex-col">
                        <h1 className="text-center font-bold text-3xl m-3 lg:text-4xl">
                            Sign up
                        </h1>
                        <p className="m-1">
                            Username:
                        </p>
                        <input
                            type="text" onChange={change}
                            value={Data.username}
                            required
                            name="username"
                            className="bg-gray-500 rounded-2xl p-1 m-1"
                        />
                        <p className="m-1">
                            Email:
                        </p>
                        <input
                            type="email"
                            onChange={change}
                            value={Data.email}
                            required name="email"
                            className="bg-gray-500 rounded-2xl p-1 m-1"
                        />
                        <p className="m-1">
                            Password
                        </p>
                        <input
                            type="password"
                            onChange={change}
                            value={Data.password}
                            required
                            name="password"
                            className="bg-gray-500 rounded-2xl p-1 m-1"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={submit}
                            className="w-1/2 bg-purple-600 px-3 py-2 my-4 font-bold rounded-2xl hover:bg-purple-700">
                            Signup
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <span>Already have an account ? &nbsp;</span>
                        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                    </div>
                </div>


            </div>
        </>
    )
}
export default Signup