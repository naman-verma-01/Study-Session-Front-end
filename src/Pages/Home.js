import React, { useState, useEffect } from 'react'
import { getSession, getSortedSession, registerForSession } from "../API/StudySession"
import { decryptJWT } from "../API/Auth"
import { useNavigate } from 'react-router-dom'
import InfoCard from '../Component/InfoCard'
function Home() {
    const [studySessionData, setStudySessionData] = useState([])
    const [order, setOrder] = useState(1)
    const [showFilter, setShowFilter] = useState(false)
    const [id, setId] = useState()
    const [loading, setLoading] = useState(true)
    const nav = useNavigate();

    const getSessionCallback = async (response) => {
        response = await response.json()
        console.log("RESPONSE DATA", response.data)
        setStudySessionData(response.data)
        //console.log("studySessionData",studySessionData)
        setLoading(false)
    }


    const getSortedSessionCallback = async (response) => {
        response = await response.json()
        console.log("RESPONSE Sroted DATA", response)
        setStudySessionData(response.data)
    }

    const getSortedSessionHandle = () => {
        getSortedSession(order, getSortedSessionCallback)
    }
    const registeredCallback = async (response) => {
        console.log("RESPONSE DATA", await response.json())
    }
    const registerForSessionCallback = async (response) => {
        // console.log("element._id",response)
        response = await response.json()
        //console.log("rJWTesponse",response)
        registerForSession(id, response.data.email, response.data.userName, registeredCallback)

    }

    const registerForSessionHandle = async (_id) => {

        console.log(_id)
        setId(_id)
        // const x = JSON.parse(localStorage.getItem('accessToken'))
        // console.log("Toekn",x)
        decryptJWT(await JSON.parse(localStorage.getItem('accessToken')), registerForSessionCallback)
        //registerForSession(id, email, userName,registerForSessionCallback)
    }
    useEffect(() => {
        document.body.style.backgroundImage = "none"
    })

    useEffect(() => {
        getSession(getSessionCallback)
    }, [])
    return (

        <div>
            <div className='pageTitle'>
                <h3>Up Coming Study Sessions&nbsp;&nbsp;

                    <button class="btn btn-primary" onClick={() => {

                        showFilter ? setShowFilter(false) : setShowFilter(true)

                    }}>Sort</button></h3>

                <br />
                {showFilter ?
                    <>
                    <p>Set Sort Order according to start date.</p>

                    <form id='filterForm'>

                        <select style={{ width: "40%" }} class=" form-control" required onChange={(e) => {setOrder(e.target.value);getSortedSessionHandle()} } value={order}>
                            <option >Select Category</option>
                            <option value={-1}>Ascending</option>
                            <option value={1}>Descending</option>
                        </select>
                    </form>
                    </>
                    : null}
            </div>



            {!loading ? studySessionData.map((element, index) => {
                return <>
                    <InfoCard element={element} page="Home" />
                </>
            }) : null}

            {!loading && studySessionData.length == 0 ? <h4>Oops! Looks like there is not data.</h4> : null}

        </div>
    )
}

export default Home