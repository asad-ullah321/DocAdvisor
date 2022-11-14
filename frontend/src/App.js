import logo from './logo.svg';
import './App.css';
import PatientDashBoard from './components/PatientDashBoard/PatientDashBoard';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<PatientDashBoard/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
