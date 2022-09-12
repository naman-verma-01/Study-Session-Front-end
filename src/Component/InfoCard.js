import React, { useState } from 'react'
import { getSession, getSortedSession, registerForSession } from "../API/StudySession"
import { decryptJWT } from "../API/Auth"
import { useSelector } from "react-redux";
import SubjectIcon from '@mui/icons-material/Subject';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';    
import PeopleIcon from '@mui/icons-material/People';
function InfoCard(props) {
    const [id, setId] = useState()
    const [registeredStu, setRegisteredStu] = useState(props.element.registeredStudents)
    const authStatus = useSelector((state) => state.user.authStatus);

    const registeredCallback = async (response) => {
        response = await response.json()
        console.log("RESPONSE DATA", response)
        if(response.data === "Slots Full"){
            window.alert("Sorry.. Slots are full. Try next time.")
        }
        else if(response.msg == "Already registered for Study Session"){
            window.alert("You have already registered for the Study Session. Happy learning.")
        }
        else{
            window.alert("Congrats. You have succesfully registered for the Study Session. Happy learning.")
            setRegisteredStu(registeredStu + 1)
        }
    }
    const registerForSessionCallback = async (response) => {
        // console.log("element._id",response)
        response = await response.json()
        //console.log("rJWTesponse",response)
        registerForSession(id, response.data.email, response.data.userName, registeredCallback)

    }

    const registerForSessionHandle = async (_id) => {
        if(authStatus){
            console.log(_id)
            setId(_id)
            decryptJWT(await JSON.parse(localStorage.getItem('accessToken')), registerForSessionCallback)            
        }
        else{
            window.alert("Please login to take part in any study session.")
        }
        // const x = JSON.parse(localStorage.getItem('accessToken'))
        // console.log("Toekn",x)
        //registerForSession(id, email, userName,registerForSessionCallback)
    }

    return (
        <div >
            <div className="card m4 scard" style={{ width: "92%", margin: "50px auto" }}>
                <div className="card-body scardbody" style={{ padding: "0px" }}>
                    <div >
                        <div className="flexadminsec1">



                            <h2>{props.element.title}</h2><br />

                            <div className='grant-card-column'>
                                <div className='grant-row'>
                                    <div className='card-heading'><SubjectIcon/>&nbsp; Subject </div>
                                    {props.element.subject}
                                </div>
                                <div className='grant-row'>
                                    <div className='card-heading'><DateRangeIcon/>&nbsp;Start Date<br /></div>
                                    {(props.element.startTime).split("T")[0]}
                                </div>
                                <div className='grant-row'>
                                    <div className='card-heading'><DateRangeIcon/>&nbsp;End Date<br /></div>
                                    {(props.element.endTime).split("T")[0]}
                                </div>
                                <div className='grant-row'>
                                    <div className='card-heading'><PeopleIcon/>&nbsp;Avaibility<br /> </div>
                                    {props.element.maxStudents}
                                </div>
                                <div className='grant-row'>
                                    <div className='card-heading'><PeopleIcon/>&nbsp; Booked<br /></div>
                                    {registeredStu}
                                </div>
                                <div className='grant-row'>
                                    <div className='card-heading'><PersonIcon/>&nbsp;Organizer<br /></div>
                                    {props.element.postedByEmail}
                                </div>
                            </div>
                        </div>

                        
                    </div>

                    <div className="text-center">
                        {props.page == "Home" ? <button className="btn btn-success" onClick={(e) => { e.preventDefault(); registerForSessionHandle(props.element._id) }} style={{ padding: "12px" }}>Take Part</button> : null}
                        {props.page == "PostSession" ? <button className="btn btn-success" onClick={(e) => { e.preventDefault(); }} style={{ padding: "12px" }}>View Participants</button> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard