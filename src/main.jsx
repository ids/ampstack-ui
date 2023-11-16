import React from 'react'
import ReactDOM from 'react-dom/client'
import { Hub } from 'aws-amplify';
import App from './App.jsx'
import awsConfig from './awsConfig.js'

import './main.scss'

awsConfig();

Hub.listen('auth', (payload) => { 
  const { event } = payload;

  if(event !== undefined) {
    console.log("HUB Auth payload:");
    console.log(payload);
  
    if (event === 'autoSignIn') {
      console.log("HUB auto sign-in user:");
      console.log(payload.data);
    } else if (event === 'signIn') {
      console.log("HUB sign-in:");
      console.log(payload.data);
    } else if (event === 'autoSignIn_failure') {
      console.log("HUB failed auto sign-in!");
    } else if (event === 'signIn_failure') {
      console.log("HUB failed sign-in!");
    }  
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
