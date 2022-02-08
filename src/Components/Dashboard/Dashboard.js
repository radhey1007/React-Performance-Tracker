import React from 'react';
import classes from './Dashboard.module.css'
import Card from '../../UI/Card/Card';
import Sidebar from '../Sidebar/Sidebar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Student from '../Student/Student';
 import { Routes , Route , Outlet } from 'react-router-dom';


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
            <h3>Dashboard page</h3>            
        </Paper>
      </Grid>
    </Grid>
    )
}

export default Dashboard;

