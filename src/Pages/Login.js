import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { SET_AUTH_STATUS } from '../Reducers/types';
import { useDispatch } from 'react-redux'
import {login} from "../API/Auth"
//import backgroundImg from "../back-to-school-black-white-doodle-hand-draw-seamless-vector-pattern-good-textile-fabric-design-wrapping-paper-website-122159565.png"

function Login() {
    const [userInfo, setUserInfo] = useState({ email: "", password: "" })
    const nav = useNavigate();
    const dispatch = useDispatch()

    const loginCallback = async(response)=>{
        response =await response.json()
        console.log("response",response)
        if (response.msg == "Login Successfull") {
            dispatch({ type: SET_AUTH_STATUS, payload: { authStatus: true } });
            localStorage.setItem("accessToken",JSON.stringify(response.accessToken))
            nav("/");
        }
        else {
            window.alert("User unidentified!!")
        }
    }
    const submitHandler =  (event) => {
        event.preventDefault()
        console.log("ONHANDLER")
        login(userInfo.email,userInfo.password,loginCallback)


      
    }

    useEffect(()=>{
        document.body.style.backgroundImage = `url(https://thumbs.dreamstime.com/b/back-to-school-black-white-doodle-hand-draw-seamless-vector-pattern-good-textile-fabric-design-wrapping-paper-website-122159565.jpg)`
    })
    return (
            
            <div className='formPage' style={{}}>
                <form className='formBody' onSubmit={submitHandler}>
                    <h1 style={{}}>&nbsp;&nbsp; Login </h1> <hr /><br />

                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Email..." onChange={(event) => { event.preventDefault(); setUserInfo({ ...userInfo, email: event.target.value }) }} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password..." onChange={(event) => { event.preventDefault(); setUserInfo({ ...userInfo, password: event.target.value }) }} />
                    </div>

                    <button onClick={submitHandler} style={{ width: "100%" }} class="btn btn-dark" >Login</button>
                    <hr />
                    <h6>Don't have an account? <a href='/signup'>Sign Up</a></h6>
        
                </form>
            </div>
            
        
    )
}

export default Login