import { Route , Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import PageNotFound from './Components/PageNotFound';
import Assignment from './Components/Assignment/Assignment';
import Dashboard from './Components/Dashboard/Dashboard';
import Batch from './Components/Batch/Batch';
import Student from './Components/Student/Student';
import Teacher from './Components/Teacher/Teacher';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>.
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Register />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/assignment" element={<Assignment />}/>
        <Route path="*" element={<PageNotFound />}/>

        <Route path="dashboard" element={<Dashboard />}>
          <Route path="student" element={<Student />} />          
          <Route path="assignment" element={<Assignment />} />
          <Route path="batch" element={<Batch />} />
          <Route path="teacher" element={<Teacher />} />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
