import "./App.css";
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import PostSession from "./Pages/PostSession"
import SignUp from "./Pages/SignUp"
import Navbar from "./Component/Navbar"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  
  const authStatus = useSelector((state) => state.user.authStatus);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/postsession" element={
            <ProtectedRoute authStatus={authStatus}  >
              <Navbar/> 
              <PostSession />
            </ProtectedRoute>
          }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/" element={<><Navbar/> <Home /></>} />

        </Routes>

        </BrowserRouter>
    </>
  );
}

// Protected Routes can only be accessed if the user's authentication status is TRUE, else redirected to login page
const ProtectedRoute = ({ authStatus, children }) => {

  if (!authStatus) {
    window.alert("You need to login to access this feature.")
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};
export default App;
