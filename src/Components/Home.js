import React , {useEffect, useState} from 'react';
import Dashboard from './Dashboard/Dashboard';
import { useNavigate } from "react-router-dom";
import Card from '../UI/Card/Card';



const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/"); 
    }else{
      const loginUserDetail = JSON.parse(localStorage.getItem('loginUserdetails'));
      setUser(loginUserDetail);
    }
  },[]);

  return <div>
          <Dashboard />         
        </div>;
}

export default Home;
