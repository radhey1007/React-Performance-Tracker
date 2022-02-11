import React from 'react';
import classes from './Sidebar.module.css'
import SidebarLink from './SidebarLink';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
  return (  <div className={classes.sidebar}>
                <NavLink className='link' to="/">
                  <SidebarLink text="Home" Icon={HomeIcon}/>
                </NavLink>
                <NavLink className='link' to="/student">
                  <SidebarLink text="Student" Icon={HomeIcon}/>
                </NavLink>                
                <SidebarLink text="Explore" Icon={SearchIcon} />
                <NavLink className='link' to="/assignment">
                <SidebarLink text="Assignment"/>
              </NavLink> 
                
                <SidebarLink text="Batch" />
                <SidebarLink text="Teacher" />
                <SidebarLink text="Change Password" />
                <SidebarLink text="Profile" Icon={PermIdentityIcon} />
                <SidebarLink text="Logout" />
            </div>
        );
}

export default Sidebar;

