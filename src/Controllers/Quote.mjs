
export function QuoteController(API) {

  async function loadAllQuotes() {
    console.info("Loading all quotes from the API");
      
    const allQuotes = await API.get(import.meta.env.VITE_EXPRESS_ENDPOINT_NAME, "/quotes/all");
    console.debug("Loaded all quotes:");
    console.debug(allQuotes);

    allQuotes.sort(function(a,b){
      return new Date(b.submittedDate) - new Date(a.submittedDate);
    });
    return allQuotes;
  }

  async function upsertQuote(quote) {
    console.info("Upserting quote:")
    console.info(quote);
    
    let payload = {
      body: quote, 
      headers: {} 
    };
    const newQuote = await API.post(import.meta.env.VITE_EXPRESS_ENDPOINT_NAME, "/quotes", payload);
    
    console.info("Posted quote:");
    console.info(newQuote);

    return newQuote;
  }

  async function deleteQuote(quoteId) {
    console.info(`Delete quote: ${quoteId}`);

    const resp = await API.del(import.meta.env.VITE_EXPRESS_ENDPOINT_NAME, "/quotes/" + quoteId);
    console.info("Deleted quote");
    console.debug(resp);
  }

  return {
    loadAllQuotes,
    upsertQuote,
    deleteQuote
  }
}


