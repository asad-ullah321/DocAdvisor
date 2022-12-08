import logo from './logo.svg';
import './App.css';
import PatientDashBoard from './components/PatientDashBoard/PatientDashBoard';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Verification from './components/Verification/Verification';
import { Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ForgetPassword1 from './components/ForgetPassword/ForgetPassword1';
import ForgetPassword2 from './components/ForgetPassword/ForgetPassword2';
import ForgetPassword3 from './components/ForgetPassword/ForgetPassword3';
import DoctorDashboard from './components/DoctorDashBoard/DoctorDashBoard';



function App() {
  return (
    <div className="">
      <CookiesProvider>
      <Routes>
        <Route path="/" element={<PatientDashBoard/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/verification" element={<Verification/>}/>
        <Route path="/signin/forget/v1" element={<ForgetPassword1/>}/>
        <Route path="/signin/forget/v2" element={<ForgetPassword2/>}/>
        <Route path="/signin/forget/v3" element={<ForgetPassword3/>}/>
      </Routes>
      </CookiesProvider>
    </div>
  );
}

export default App;
