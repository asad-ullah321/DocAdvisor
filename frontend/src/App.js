import logo from './logo.svg';
import './App.css';
import PatientDashBoard from './components/PatientDashBoard/PatientDashBoard';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import SignInPateint from './components/SigninPateint/signin';
import SignUpPateint from './components/SignUpPateint/SignUpP';
import Verification from './components/Verification/Verification';
import VerificationDoc from './components/Verification/VerificationDoc';
import VerificationAdmin from './components/Verification/VerificationAdmin';
import AdminDash from './components/Admin/dashBoard';
import RemoveDoc from './components/Admin/delDoc';
import InsertMed from './components/Admin/InsertMed';
import CheckDoc from './components/Admin/CheckDoc';
import { Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ForgetPassword1 from './components/ForgetPassword/ForgetPassword1';
import ForgetPassword2 from './components/ForgetPassword/ForgetPassword2';
import ForgetPassword3 from './components/ForgetPassword/ForgetPassword3';
import DoctorDashboard from './components/DoctorDashBoard/DoctorDashBoard';
import  Appointments  from './components/Appointments/Appointments';
import Rating from './components/Rate/Rating';
import ForgetPassword1P from './components/ForgetPasswordPat/ForgetPassword1';
import ForgetPassword2P from './components/ForgetPasswordPat/ForgetPassword2';
import ForgetPassword3P from './components/ForgetPasswordPat/ForgetPassword3';
import AdminSignin from './components/Admin/AdminSignin';
import Chat from './components/Chat/Chat';
import Home from "./components/Home"
import ChatPage from "./components/ChatPage";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:5000")


function App() {
  return (
    <div className="">
      <CookiesProvider>
      <Routes>
       {/*<Route path="/" element={<PatientDashBoard/>}/>*/}
        <Route path="/PatientDashBoard" element={<PatientDashBoard/>}/>
        <Route path='/DoctorDashBoard' element={<DoctorDashboard/>}/>
        <Route path="/signin/doctor" element={<SignIn/>}/>
        <Route path="/signin/pateint" element={<SignInPateint/>}/>
        <Route path="/signupPat" element={<SignUpPateint/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        <Route path="/adminSignin" element={<AdminSignin/>}/>
        <Route path="/admindashBoard" element={<AdminDash socket={socket}/>}/>
        <Route path="/removeDoc" element={<RemoveDoc/>}/>
        <Route path="/insertMed" element={<InsertMed/>}/>

  

       <Route path="/home" element={<Home socket={socket}/>}></Route>
       <Route path="/chat" element={<ChatPage socket={socket}/>}></Route>

        

        <Route path="/signin/forget/v1" element={<ForgetPassword1/>}/>
        <Route path="/signin/forget/v2" element={<ForgetPassword2/>}/>
        <Route path="/signin/forget/v3" element={<ForgetPassword3/>}/>
        <Route exact path="/appointments" element={<Appointments/>}/>

        <Route path="/signin/forget/v1Pat" element={<ForgetPassword1P/>}/>
        <Route path="/signin/forget/v2Pat" element={<ForgetPassword2P/>}/>
        <Route path="/signin/forget/v3Pat" element={<ForgetPassword3P/>}/>

        <Route path="/verification" element={<Verification/>}/>
        <Route path="/verificationDoc" element={<VerificationDoc/>}/>
        <Route path="/verificationAdmin" element={<VerificationAdmin/>}/>
      
      
      </Routes>
      </CookiesProvider>
    </div>
  );
}

export default App;
