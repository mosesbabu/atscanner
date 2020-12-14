import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import googleLogin from "src/services/googleLogin"

class GoogleSocialAuth extends Component {

  render() {
    
    const responseGoogle = async(response) => {
        let googleResponse  = await googleLogin(response.accessToken)
        console.log(googleResponse);
        console.log(response);
      }
    const googleResponse = (response) => {
      console.log(response);
    }
    return (
      <div className="App">
        
        <div style={{display: 'flex',flexWrap: 'wrap' }} >
        <GoogleLogin
          clientId="598403764622-viq93snlcl28gips3oii63bgn3ct7o27.apps.googleusercontent.com"
          buttonText="Continue Signup with  Google Account"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          className='btnGoogle'
          
        />
        </div>
      </div>
    );
  }
}

export default GoogleSocialAuth;