import { get, post } from "aws-amplify/api";
import { fetchAuthSession } from 'aws-amplify/auth';

export function UserController() {

  function getProviderType(user) {
    let providerType = "";
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
    console.info("API Authorization Header (for curl testing):")
    console.info(`Bearer: ${(await fetchAuthSession()).tokens.idToken.toString()}`);
  }
  
  async function getRegisteredUser(userId) {

    const restOperation = get({ 
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/users/' + userId 
    });
    
    const resp = await restOperation.response;
    const registeredUser = await resp.body.json();

    console.info(`Fetched registered user ${userId}:`);
    console.debug(registeredUser);

    return registeredUser;
  }

  async function registerUser(user) {

    if(!user) {
      throw({ message: "registerUser got a falsey User!"});
    }

    let payload = {
      userId: user.username,
      email: user.attributes['email']
    };

    const restOperation = post({
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/users',
      options: {
        body: payload
      }
    });
    
    const resp = await restOperation.response;
    const registeredUser = await resp.body.json();

    console.info(`Posted register user update ${payload.userId}:`);
    console.debug(registeredUser);

    return registeredUser;
  }
  
  return {
    getProviderType,
    getProviderTag,
    registerUser,
    getRegisteredUser,
    logIdToken
  }
}


