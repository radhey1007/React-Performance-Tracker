import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
 import { Outlet } from 'react-router-dom';


const Dashboard = (props) => {
    return (
    <Grid container>
       <Grid item xs={3}>
        <Paper>
             <Sidebar />  
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper>  
            <Outlet />              
        </Paper>
      </Grid>
    </Grid>
    )
}

export default Dashboard;

