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
  
  function registerUser(user) {
    return new Promise((resolve, reject) => {
      if(!user) {
        console.error("registerUser got a falsey User!");
        reject();
      }
  
      console.log(user);
      
      let payload = {
        body: {
          userId: user.username,
          email: user.attributes['email']
        }, 
        headers: {} // OPTIONAL
      };
  
      API.post(import.meta.env.VITE_EXPRESS_ENDPOINT_NAME, "/users", payload).then((postedUser) => {
        console.log("Registered User visit to Workspace:");
        console.debug(postedUser);
        logIdToken();
        resolve(postedUser);
      }).catch((err) => {
        console.error("Post User API ERROR:");
        console.error(err);
        reject(err);
      });
    });
  }
  
  function getRegisteredUser(userId) {
    return new Promise((resolve, reject) => {
  
      API.get(import.meta.env.VITE_EXPRESS_ENDPOINT_NAME, "/users/" + userId).then((fetchedUser) => {
        console.log(`Fetched User with userId [${userId}]:`);
        console.debug(fetchedUser);
        resolve(fetchedUser);
      }).catch((err) => {
        console.error("Get User API ERROR:");
        console.error(err);
        reject(err);
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


