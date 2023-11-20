import { get, post } from "aws-amplify/api";
import { fetchAuthSession } from 'aws-amplify/auth';

async function _getUser(userId) {
  try {
    const restOperation = get({ 
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/users/' + userId 
    });
    
    return await restOperation.response;
  } catch (ex) {
    console.log('GET call getUser failed: ', ex);
    throw ex;
  }
}

async function _registerUser({user, callback, errorHandler}) {
  try {
    const restOperation = post({
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/users',
      options: {
        body: user
      }
    });
    
    return await restOperation.response;
  } catch (ex) {
    console.error('POST call registerUser failed: ', ex);
    throw ex;
  }
}

export function UserController() {

  function getProviderType(user) {
    let providerType = "Default";
    try {
      if (user.attributes.identities) {
        providerType = JSON.parse(user.attributes.identities)[0].providerType;
      }
    } catch (ex) {
      console.log("no luck parsing the user.attributes!");
    }
    return providerType;
  }
  
  function getProviderTag(user) {
    switch(getProviderType(user)) {
      case "Google":
        return "Googler";
      case "LoginWithAmazon":
        return "Amazonian";
      default:
        return "AmpStack";
    }
  }
  
  async function logIdToken() {
    console.log(`Bearer: ${(await fetchAuthSession()).tokens.idToken }`);
  }
  
  function getRegisteredUser(userId) {
    return _getUser(userId);
  }

  function registerUser(user) {
    return new Promise((resolve, reject) => {
      if(!user) {
        reject({ message: "registerUser got a falsey User!"});
      }
    
      console.info("Auth User:");
      console.info(user);
      
      let payload = {
        userId: user.username,
        email: user.attributes['email']
      };
  
      console.info("Register User Send Payload:")
      console.info(payload);
      
      _registerUser({
        user: payload 
      }).then((resp) => {
        resp.body.json().then((registeredUser) => {
          console.info("Unpacked Registered User:");
          console.log(registeredUser);  

          resolve(registeredUser);  
        });
      });
    });
  }
  
  return {
    getProviderType,
    getProviderTag,
    registerUser,
    getRegisteredUser,
    logIdToken
  }
}


