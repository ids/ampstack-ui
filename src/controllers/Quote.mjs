
async function _loadAllQuotes(get, callback, errorHandler) {
  try {
    const restOperation = get({ 
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/quotes/all' 
    });
    const response = await restOperation.response;
    console.log('GET call succeeded: ', response);
    if(callback) {
      callback(response);
    }
  } catch (error) {
    console.log('GET call failed: ', error);
    if(errorHandler) { errorHandler(error); }
  }
}

async function _upsertQuote(post, quote, callback, errorHandler) {
  try {
    const restOperation = post({
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/quotes',
      options: {
        body: quote
      }
    });
    const response = await restOperation.response;
    console.info('POST call succeeded: ', response);
    if(callback) {
      callback(response);
    }
  } catch (error) {
    console.log('POST call failed: ', error);
    if(errorHandler) { errorHandler(error); }
  }
}

async function _deleteQuote(del, quoteId, callback, errorHandler) {
  try {
    const restOperation = del({
      apiName: mport.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/quotes/' + quoteId
    });
    await restOperation.response;
    console.info('DELETE call succeeded');
    if(callback) {
      callback(response);
    }
  } catch (error) {
    console.error('DELETE call failed: ', error);
    if(errorHandler) { errorHandler(error); }
  }
}

export function QuoteController(get, post, del) {

  function loadAllQuotes() {
    return new Promise((resolve, reject) => {
      console.info(`Loading quotes from the API ${import.meta.env.VITE_EXPRESS_ENDPOINT_NAME}`);

      const resp = _loadAllQuotes(get, function(resp) {
        console.debug("load all quotes response:");
        console.debug(resp);
        
        resp.body.json().then((allQuotes) => {

          console.debug("parsed quotes response:");
          console.debug(allQuotes);

          allQuotes.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.submittedDate) - new Date(a.submittedDate);
          });
  
          resolve(allQuotes);  
        }).catch((ex) => {
          reject(ex);
        });
      }, function (err) {
        reject(err);
      });
    });
  }

  function upsertQuote(quote) {
    return new Promise((resolve, reject) => {
      console.info("Upserting Quote:")
      console.info(quote);
      
      const resp = _upsertQuote(post, quote, function(resp) {

        console.debug("upsertQuote response:")
        console.debug(resp);

        resp.body.json().then((savedQuote) => {
          console.debug("parsed upsertQuote response:")
          console.debug(savedQuote);  
          resolve(savedQuote);  
        }).catch((ex) => {
          reject(ex);
        });
      }, function(err) {
        reject(err);
      });
    });
  }

  function deleteQuote(quoteId) {
    return new Promise((resolve, reject) => {
      console.info(`Delete Quote: ${quoteId}`);

      const resp = _deleteQuote(del, quoteId, function(resp) {
        console.log(resp);
        resolve(resp);
      }, function(err) {
        reject(err);
      });
    });
  }

  return {
    loadAllQuotes,
    upsertQuote,
    deleteQuote
  }
}


