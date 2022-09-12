import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SET_AUTH_STATUS } from '../Reducers/types';
import { useDispatch } from 'react-redux'
import {signup} from "../API/Auth" 

function Login() {
    const [userInfo, setUserInfo] = useState({ username: "", email: "", password: "" })
    const nav = useNavigate();
    const dispatch = useDispatch()

    const signupCallback = (response)=>{
        response = response.json()
        console.log("RESPONSE",response)
        if (response.msg == "Sign Up Successfull") {
            dispatch({ type: SET_AUTH_STATUS, payload: { authStatus: true } });
            localStorage.setItem("accessToken",JSON.stringify(response.accessToken))
            nav("/");
        }
        else {
            window.alert("User Sign Up Failed!!")
        }
    }
    const submitHandler = async () => {
        signup(userInfo.email,userInfo.password,userInfo.username,signupCallback)

        
    }
    
    useEffect(()=>{
        document.body.style.backgroundImage = `url(https://thumbs.dreamstime.com/b/back-to-school-black-white-doodle-hand-draw-seamless-vector-pattern-good-textile-fabric-design-wrapping-paper-website-122159565.jpg)`
    })
    return (

        <div className='formPage'>
            <form className='formBody' onSubmit={submitHandler}>
                <h1 style={{}}>&nbsp;&nbsp; Sign Up </h1> <hr /><br />
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">User Name</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="User Name..." onChange={(event) => { event.preventDefault(); setUserInfo({ ...userInfo, username: event.target.value }) }} />
                </div>

                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Email</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Email..." onChange={(event) => { event.preventDefault(); setUserInfo({ ...userInfo, email: event.target.value }) }} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password..." onChange={(event) => { event.preventDefault(); setUserInfo({ ...userInfo, password: event.target.value }) }} />
                </div>

                <button type="submit" style={{ width: "100%" }} class="btn btn-dark" onClick={submitHandler}>Login</button>

                <hr />
                <h6>Already Signed Up? <a href='/login'>Login</a></h6>

            </form>
        </div>

    )
}

export default Login