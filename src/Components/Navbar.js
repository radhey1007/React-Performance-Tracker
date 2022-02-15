import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';


function Navbar() {

  const token = localStorage.getItem('token') || ''; 
    

  return <div className='navbar'>
            <h1>MPT</h1>
            <div className='navlink'>
                {!token && <NavLink className='link' to="/">Login</NavLink>} 
                {!token && <NavLink className='link' to="/registration">Registration</NavLink>}   
                <NavLink className='link' to="/about">About</NavLink>    
                <NavLink className='link' to="/contact">Contact</NavLink>    
            </div>
        </div>;
}

export default Navbar;
