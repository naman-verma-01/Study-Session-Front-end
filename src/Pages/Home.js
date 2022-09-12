import React, { useState, useEffect } from 'react'
import { getSession, getSortedSession, registerForSession } from "../API/StudySession"
import InfoCard from '../Component/InfoCard'
function Home() {
    const [studySessionData, setStudySessionData] = useState([])
    const [order, setOrder] = useState(1)
    const [showFilter, setShowFilter] = useState(false)
    const [loading, setLoading] = useState(true)
   
    const getSessionCallback = async (response) => {
        response = await response.json()
        console.log("RESPONSE DATA", response.data)
        setStudySessionData(response.data)
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