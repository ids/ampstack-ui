import { Auth } from 'aws-amplify';

export function UserController(API) {

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
    console.log(`Bearer: ${(await Auth.currentSession()).getIdToken().getJwtToken()}`);
  }
  
  async function registerUser(user) {
    if(!user) {
      throw("registerUser got a falsey User!");
    }

    let payload = {
      body: {
        userId: user.username,
        email: user.attributes['email']
      }, 
      headers: {} // OPTIONAL
    };
    const postedUser = await API.post(import.meta.env.VITE_EXPRESS_ENDPOINT_NAME, "/users", payload);
    
    console.log("Registered user visit to Workspace:");
    console.debug(postedUser);

    logIdToken();

    return postedUser;
  }
  
  async function getRegisteredUser(userId) {
    const fetchedUser = await API.get(import.meta.env.VITE_EXPRESS_ENDPOINT_NAME, "/users/" + userId);
    console.log(`Fetched user with userId [${userId}]:`);
    console.debug(fetchedUser);
    return fetchedUser;
  }

  return {
    getProviderType,
    getProviderTag,
    registerUser,
    getRegisteredUser,
    logIdToken
  }
}


