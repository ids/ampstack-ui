import Carousel from 'react-bootstrap/Carousel';
import QuoteCarouselImage from './QuoteCarouselImage';
import Markdown from 'react-markdown'

import './QuoteViewer.css';

export default function QuoteViewer({quoteList}) {
  
  const getQuoteContent = quotes => {
    let content = [];
  
    if(quotes.items.length == 0) {
      content.push(
        <span className="QuoteViewer-loading" key="0">Loading Quotes...</span>
      );
      return content;
    }

    quotes.items.map((quote, index) => {
      let quoteTextCSS = "quote-text";
      if(quote.text.length > 60 && quote.text.length <= 100) {
        quoteTextCSS += " med";
      } else if(quote.text.length > 100) {
        quoteTextCSS += " long";
      }

      content.push(
          <Carousel.Item key={index} >
          <QuoteCarouselImage />
            <Carousel.Caption>
              <div className={quoteTextCSS}><Markdown className="markdown">{ quote.text }</Markdown></div>
              <div className="quote-author"><Markdown className="markdown">{'&ndash; ' + (quote.author === "" ? "Anonymous" : quote.author)}</Markdown></div>
            </Carousel.Caption>
          </Carousel.Item>    
      );
    });
    return <Carousel data-bs-theme="light">{content}</Carousel>;
  };
  

  return (
    <div className="QuoteViewer">
      { getQuoteContent(quoteList) }
    </div>
  );
}