import { get, post, del } from "aws-amplify/api";

export function QuoteController() {
  
  async function loadAllQuotes() {
      console.info(`Loading quotes from the API ${import.meta.env.VITE_EXPRESS_ENDPOINT_NAME}`);

      const restOperation = get({ 
        apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
        path: '/quotes/all' 
      });
      
      const resp = await restOperation.response;
      const allQuotes = await resp.body.json();
    
      allQuotes.sort((a,b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.submittedDate) - new Date(a.submittedDate);
      });

      console.log(`Fetched ${allQuotes.length} Quotes.`);

      return allQuotes;
  }

  async function upsertQuote(quote) {
      console.info("Upserting Quote:")
      console.info(quote);
      
      const restOperation = post({
        apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
        path: '/quotes',
        options: {
          body: quote
        }
      });
      
      const resp = await restOperation.response;
      const savedQuote = await resp.body.json();

      console.debug("parsed upsertQuote response:")
      console.debug(savedQuote);  

      return savedQuote;
  }

  async function deleteQuote(quoteId) {
    const restOperation = del({
      apiName: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      path: '/quotes/' + quoteId
    });
    
    await restOperation.response;
    console.log("Delete Quote succeeded");
  }

  return {
    loadAllQuotes,
    upsertQuote,
    deleteQuote
  }
}


