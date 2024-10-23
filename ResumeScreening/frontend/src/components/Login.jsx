import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Login = () => {
    const navigate=useNavigate()
    const [logindata, setLoginData]=useState({
        email:"",
        password:""
    })
    const [error, setError] = useState("")
    const [isLoading, setIsLoading]=useState(false)
    const handleOnChange= (e)=>{
        setLoginData({...logindata, [e.target.name]:e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const {email, password}=logindata
        if(!email || !password){
            setError("email and password are required")
        } else {
            setIsLoading(true)
            const res = await axios.post("http://localhost:8000/api/v1/auth/login/", logindata)
            const response = res.data
            console.log(response)
            setIsLoading(false)
            const user ={
                "email":response.email,
                "name":response.full_name,
            }
            if(res.status === 200) {
                localStorage.setItem("user",JSON.stringify(user))
                localStorage.setItem("access",JSON.stringify(response.access_token))
                localStorage.setItem("refresh",JSON.stringify(response.refresh_token))
                navigate("/dashboard")
                toast.success("login successful")
            }
        }
    }
    return(
        <div>
            <div className="form-container">
                <div style={{width: "100%"}} className="wrapper">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        {isLoading && (
                            <p>Loading....</p>
                        )}
                        <div className='form-group'>
                            <label htmlFor="">Email Address</label>
                            <input type="text"
                            className='email-form'  
                            name="email"
                            value={logindata.email}
                            onChange={handleOnChange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Password</label>
                            <input type="password"
                            className='email-form'  
                            name="password"
                            value={logindata.password}
                            onChange={handleOnChange}/>
                        </div>
                        <input type="submit" value="Sign in" className="submitButton" />
                    </form>
                    <h3 className='text-option'>Or</h3>
                    <div className='githubContainer'>
                        <button>Sign in with Github</button>
                    </div>
                    <div className='googleContainer'>
                        <button>Sign in with Google</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login