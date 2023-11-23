import Backbone from 'backbone';
import _ from 'underscore';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

import './QuoteViewer.css';
import HTML_TEMPLATE from './QuoteViewer.html?raw';

export const QuoteViewerView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  quotes: [],

  render: function() {
    let quoteList = [];

    this.quotes.forEach((quote) => {

      let quoteTextCSS = "quote-text";
      if(quote.text.length > 60 && quote.text.length <= 100) {
        quoteTextCSS += " med";
      } else if(quote.text.length > 100) {
        quoteTextCSS += " long";
      }

      quoteList.push({
        textHTML: DOMPurify.sanitize(marked.parse(quote.text)),
        quoteTextCSS: quoteTextCSS,
        authorHTML: DOMPurify.sanitize(marked.parse(quote.author === "" ? "Anonymous" : quote.author))
      })
    });
    this.$el.html(this.template({
      quoteList: quoteList
    }));

    setTimeout(() => {
      $("#carouselIndicatorButton0").trigger('click');
    }, 500);
  }
});