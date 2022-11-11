import logo from './logo.svg';
import './App.css';
import PatientNavbar from './components/PatientNavbar/PatientNavbar';
import SignIn from './components/SignIn/SignIn';
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<PatientNavbar/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<PatientNavbar/>}/>
      </Routes>
    </div>
  );
}

export default App;
