import React, { useState, useEffect } from 'react'
import { createSession, getSessionsOfUser } from "../API/StudySession"
import { useNavigate } from 'react-router-dom'
import { decryptJWT } from "../API/Auth"
import InfoCard from "../Component/InfoCard"

function PostSession() {
    const [sessionInfo, setSessionInfo] = useState({ title: "", subject: "", startTime: "0001-01-01", endTime: "0001-01-01", maxStudents: "" })
    const nav = useNavigate();
    const [userSession, setUserSession] = useState()
    const [loading, setLoading] = useState(true)
    const [hideData, setHideData] = useState(false)
    //const [userInfo, setUserInfo] = useState()
    const createSessionCallback = async (response) => {
        response = await response.json()
        console.log("response", response)
        if (response.msg == "Study Session Created Successfully") {
            window.alert("Session Successfully posted")
            nav("/")

        }
    }


    let getUserDetailCallback = async (response) => {
        response = await response.json()
        console.log("JWT RESPONSE", response)
        setSessionInfo({ ...sessionInfo, postedByEmail: response.data.email })
        createSession({ ...sessionInfo, postedByEmail: response.data.email }, createSessionCallback)

    }
    const submitHandler = async () => {
        setHideData(false)
        decryptJWT(await JSON.parse(localStorage.getItem('accessToken')), getUserDetailCallback)

    }

    const handleData = async (response) => {
        // event.preventDefault()
        response = await response.json()
        console.log("RESPINSE", response)
        setUserSession(response.data)
        setLoading(false)
    }
    const getUserPostedSessionsCallback = async (response) => {
        response = await response.json()
        console.log("JWT USER RES", response)
        getSessionsOfUser(response.data.email, handleData)
    }


    const getUserPostedSessions = async () => {
        if (loading) {
            decryptJWT(await JSON.parse(localStorage.getItem('accessToken')), getUserPostedSessionsCallback)
        }
    }
    useEffect(() => {

        document.body.style.backgroundImage = "none"

    })
    getUserPostedSessions()
    const postClick = () => {
        document.getElementById("postForm").style.display = "block"
        document.getElementById("postButton").style.display = "none"
        setHideData(true)
    }

    const cancelPost = () => {
        document.getElementById("postForm").style.display = "none"
        document.getElementById("postButton").style.display = "inline"
        setHideData(false)
    }
    return (
        <>
            <div className='pageTitle'>
                <h3>My Study Sessions
                    &nbsp;&nbsp;<button onClick={postClick} style={{ textAlign: "right" }} id='postButton' class="btn btn-secondary" >Post Session</button>
                </h3>
            </div>
            <form id='postForm' style={{ display: "none" }} onSubmit={() => { submitHandler() }}>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Title..." onChange={(event) => { event.preventDefault(); setSessionInfo({ ...sessionInfo, title: event.target.value }) }} />
                </div>

                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Subject</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Subject..." onChange={(event) => { event.preventDefault(); setSessionInfo({ ...sessionInfo, subject: event.target.value }) }} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Start Time</label>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="Start Time..." onChange={(event) => { event.preventDefault();console.log("DATE",typeof(event.target.value)); setSessionInfo({ ...sessionInfo, startTime: event.target.value }) }} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">End Time</label>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="End Time..." onChange={(event) => { event.preventDefault(); setSessionInfo({ ...sessionInfo, endTime: event.target.value }) }} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Maximum Student</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Maximum Student..." onChange={(event) => { event.preventDefault(); setSessionInfo({ ...sessionInfo, maxStudents: event.target.value }) }} />
                </div>

                <div style={{textAlign: "center"}}>
                <button type="submit" style={{}} class="btn btn-success" onClick={(event) => { event.preventDefault(); submitHandler() }}>Post</button>
                &nbsp;
                <button onClick={cancelPost} type="button" class="btn btn-danger">Cancel</button>
                </div>
            </form>

            {!loading && !hideData ? userSession.map((element, index) => {
                return <>
                    <InfoCard element={element} page="PostSession"/>
                  
                </>
            }) : null}



        </>
    )
}

export default PostSession