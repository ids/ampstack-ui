import Carousel from 'react-bootstrap/Carousel';
import QuoteCarouselImage from './QuoteCarouselImage';
import Markdown from 'react-markdown'

import './QuoteViewer.scss';

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
      content.push(
          <Carousel.Item key={index} >
          <QuoteCarouselImage />
            <Carousel.Caption>
              <div className="quote-text"><Markdown className="markdown">{ quote.text }</Markdown></div>
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