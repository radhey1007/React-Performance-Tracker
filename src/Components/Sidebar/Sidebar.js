import React from 'react';
import classes from './Sidebar.module.css'
import SidebarLink from './SidebarLink';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Sidebar = (props) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginUserdetails');   
    navigate("/") 
  }

  return (  <div className={classes.sidebar}>
                <NavLink className='sidelink' to="">
                  <SidebarLink text="Home" Icon={HomeIcon}/>
                </NavLink>
                <NavLink className='sidelink' to="/dashboard/student">
                  <SidebarLink text="Student" Icon={PermIdentityIcon}/>
                </NavLink>               
                <NavLink className='sidelink' to="/dashboard/batch">
                  <SidebarLink text="Batch" Icon={HomeIcon}/>
                </NavLink> 
                <NavLink className='sidelink' to="/dashboard/assignment">
                <SidebarLink text="Assignment" Icon={HomeIcon}/>
              </NavLink> 
                <NavLink className='sidelink' to="/dashboard/teacher">
                  <SidebarLink text="Teacher" Icon={PermIdentityIcon}/>
                </NavLink>
                <NavLink className='sidelink' to="/dashboard/profile">
                  <SidebarLink text="Profile" Icon={PermIdentityIcon} />
                </NavLink> 
                 <div className='sidelink' onClick={onLogout}>
                   <SidebarLink text="Logout" Icon={HomeIcon} />
                </div>               
            </div>
        );
}

export default Sidebar;

