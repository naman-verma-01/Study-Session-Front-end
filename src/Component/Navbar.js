import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { useSelector } from "react-redux";

function Navbar() {
  const nav = useNavigate();
  const authStatus = useSelector((state) => state.user.authStatus);


  return (
    <div>
      <nav>
        <LocalLibraryIcon style={{margin:"5px"}}/>
        <button className='navLink' onClick={() => {nav("/")}}><p>Home</p></button>
        <button className='navLink' onClick={() => {nav("/postsession")}}><p>Activity</p></button>

        <button style={{float:"right"}} className='navLink' onClick={() => {nav("/signup")}}><p>Sign Up</p></button>
        {authStatus? <a className='navLink' style={{float:"right"}} href='/login'>Log Out</a>:null}
        {!authStatus?<button style={{float:"right"}} className='navLink' onClick={() => {nav("/login")}}><p>Login</p></button>:null}
      </nav>
    </div>
  )
}


export default Navbar