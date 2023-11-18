
export function QuoteController(API) {

  function loadAllQuotes() {
    return new Promise((resolve, reject) => {
      console.info("Loading quotes from the API");
      API.get(import.meta.env.VITE_EXPRESS_ENDPOINT_NAME, "/quotes/all").then((allQuotes) => {
        console.debug("Loaded All Quotes:");
        console.debug(allQuotes);
  
        allQuotes.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.submittedDate) - new Date(a.submittedDate);
        });
  
        resolve(allQuotes);
  
      }).catch((err) => {
        console.error("All Quotes Load API ERROR:");
        console.error(err);
        reject(err);
      });
    });
  }


  function upsertQuote(quote) {
    return new Promise((resolve, reject) => {

      console.info("Upserting Quote:")
      console.info(quote);
      console.log(API);
      
      let payload = {
        body: quote, // replace this with attributes you need
        headers: {} // OPTIONAL
      };

      API.post(import.meta.env.VITE_EXPRESS_ENDPOINT_NAME, "/quotes", payload).then((newQuote) => {
          console.debug("Posted Quote:");
          console.debug(newQuote);
          resolve(newQuote);

        }).catch((err) => {
          console.error("Upsert Quote API ERROR:");
          console.error(err);
          reject(err);
        });
      });  
  }

  function deleteQuote(quoteId) {
    return new Promise((resolve, reject) => {
      console.info(`Delete Quote: ${quoteId}`);

      API.del(import.meta.env.VITE_EXPRESS_ENDPOINT_NAME, "/quotes/" + quoteId).then((resp) => {
        console.debug("Delete Quote:");
        console.debug(resp);
        resolve(resp);

      }).catch((err) => {
        console.error("Delete Quote API ERROR:");
        console.error(err);
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


