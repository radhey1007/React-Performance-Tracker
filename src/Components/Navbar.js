import React from 'react';
import { NavLink } from 'react-router-dom';


function Navbar() {
  return <div className='navbar'>
            <h1>Performance Tracker</h1>
            <div className='navlink'>
                <NavLink className='link' to="/">Home</NavLink>  
                <NavLink className='link' to="/login">Login</NavLink> 
                <NavLink className='link' to="/registration">Registration</NavLink>   
                <NavLink className='link' to="/about">About</NavLink>    
                <NavLink className='link' to="/contact">Contact</NavLink>    
            </div>
        </div>;
}

export default Navbar;
