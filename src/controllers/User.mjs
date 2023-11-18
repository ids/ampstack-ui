
async function _getUser(get, userId, callback, errorHandler) {
  try {
    const restOperation = get({ 
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/users/' + userId 
    });
    const response = await restOperation.response;
    console.log('GET call getUser succeeded: ', response);
    if(callback) {
      callback(response);
    }
  } catch (error) {
    console.log('GET call getUser failed: ', error);
    if(errorHandler) { errorHandler(error); }
  }
}

async function _registerUser(post, user, callback, errorHandler) {
  try {
    const restOperation = post({
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/users',
      options: {
        body: user
      }
    });
    const response = await restOperation.response;
    console.info('POST call registerUser succeeded: ', response);
    if(callback) {
      callback(response);
    }
  } catch (error) {
    console.log('POST call registerUser failed: ', error);
    if(errorHandler) { errorHandler(error); }
  }
}


export function UserController(get, post, fetchAuthSession) {

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
  
  function registerUser(user) {
    return new Promise((resolve, reject) => {
      if(!user) {
        console.error("registerUser got a falsey User!");
        reject();
      }
  
      console.log(user);
      
      let payload = {
        userId: user.username,
        email: user.attributes['email']
      };
  
      console.info("Register User:")
      console.info(payload);
      
      const resp = _registerUser(post, payload, function(resp) {
        console.log(resp);
        resp.body.json().then((registeredUser) => {
          console.log(registeredUser);  
          resolve(registeredUser);  
        });
      }, function(err) {
        reject(err);
      });
    });
  }
  
  function getRegisteredUser(userId) {
    return new Promise((resolve, reject) => {
  
      const resp = _getUser(get, userId, function(resp) {
        console.log(resp);
        resp.body.json().then((registeredUser) => {
          console.log(registeredUser);  
          resolve(registeredUser);  
        }, function(err) {
          reject(err);
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


