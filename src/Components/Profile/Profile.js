import React from 'react';

const Profile= () => {

  const loginUserDetail = JSON.parse(localStorage.getItem('loginUserdetails'));

  return (<div>Profile page
      <h2>General Information</h2>
      <h3>Name: {loginUserDetail.name}</h3>
      <h3>User Type: {loginUserDetail.userType}</h3>
      <h3>Email: {loginUserDetail.email}</h3>
      <h3>Contact: {loginUserDetail.contact}</h3>
  </div>);
}

export default Profile;
