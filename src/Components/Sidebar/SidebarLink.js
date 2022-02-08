import React from 'react';
import classes from "./SidebarLink.module.css";


function SidebarLink({text, Icon}) {
  return  <div className={classes.link}>
            {Icon && <Icon />}
            <h2>{text}</h2>
          </div>;
}

export default SidebarLink;
