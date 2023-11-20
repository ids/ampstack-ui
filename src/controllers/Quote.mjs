import { get, post, del } from "aws-amplify/api";

async function _loadAllQuotes() {
  try {
    const restOperation = get({ 
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/quotes/all' 
    });
    
    return await restOperation.response;
  } catch (ex) {
    console.error('GET call failed: ', ex);
    throw ex;
  }
}

async function _upsertQuote({ quote, callback, errorHandler }) {
  try {
    const restOperation = post({
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/quotes',
      options: {
        body: quote
      }
    });
    
    return await restOperation.response;
  } catch (ex) {
    console.error('POST call failed: ', ex);
    throw ex;
  }
}

async function _deleteQuote({ quoteId, callback, errorHandler }) {
  try {
    const restOperation = del({
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/quotes/' + quoteId
    });
    
    return await restOperation.response;
  } catch (ex) {
    console.error('DELETE call failed: ', ex);
    throw ex;
  }
}

export function QuoteController() {
  
  function loadAllQuotes() {
    return new Promise((resolve, reject) => {
      console.info(`Loading quotes from the API ${import.meta.env.VITE_EXPRESS_ENDPOINT_NAME}`);

      _loadAllQuotes().then((resp) => {
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
      }).catch((ex) => {
        reject(ex);
      });
    });
  }

  function upsertQuote(quote) {
    return new Promise((resolve, reject) => {
      console.info("Upserting Quote:")
      console.info(quote);
      
      _upsertQuote({
        quote: quote
      }).then((resp) => {
        console.debug("upsertQuote response:")
        console.debug(resp);

        resp.body.json().then((savedQuote) => {
          console.debug("parsed upsertQuote response:")
          console.debug(savedQuote);  
          resolve(savedQuote);  
        }).catch((ex) => {
          reject(ex);
        });
      }).catch((ex) => {
        reject(ex);
      });
    });
  }

  function deleteQuote(quoteId) {
    return _deleteQuote({quoteId});
  }

  return {
    loadAllQuotes,
    upsertQuote,
    deleteQuote
  }
}


