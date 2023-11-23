import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import { QuoteViewerView } from './QuoteViewer';
import { QuoteEditorView } from './QuoteEditor';
import { QuoteController } from '../controllers/Quote';

import './WorkspacePage.css';
import HTML_TEMPLATE from './WorkspacePage.html?raw';

export const WorkspacePageView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  quotes: [],
  user: undefined,
  quoteController: QuoteController(),

  events: {
    "click #quoteEditorTab":            "quoteEditorTabClickHandler"
  },

  quoteEditorTabClickHandler: function(event) {
    setTimeout(() => {
      this.quoteEditor.setFocus();
    }, 500);
  },

  loadQuotes: async function() {
    try {
      const allQuotes = await this.quoteController.loadAllQuotes();
      this.quotes = allQuotes;
      this.renderChildViews();  
    } catch(ex) {
      console.error("ERROR loading quotes:", ex);
    }
  },

  renderChildViews: function() {
    this.quoteViewer.quotes = this.quotes;
    if(this.quotes.length > 0) { this.quoteViewer.render() };

    this.quoteEditor.quotes = this.quotes;
    this.quoteEditor.user = this.user;
    this.quoteEditor.render();
  },

  render: function() {
    var that = this;
    this.$el.html(this.template({}));

    this.quoteViewer = new QuoteViewerView({ el: "#quoteViewer"});
    this.quoteEditor = new QuoteEditorView({ el: "#quoteEditor"});
    this.quoteEditor.upsertQuoteCallback = async (quote) => {
      try 
      {
        const savedQuote = await that.quoteController.upsertQuote(quote);
        console.info(`Saved quote: ${savedQuote.quoteId}`);
        console.debug(savedQuote);
        that.quoteEditor.clearAddQuoteForm();
        that.loadQuotes();  
      } catch(ex) {
        console.error("Upsert quote FAILED:", ex);
      }
    };

    this.quoteEditor.deleteQuoteCallback = async (quoteId) => {
      try {
        await that.quoteController.deleteQuote(quoteId);
        console.info(`Deleted quote: ${quoteId}`);
        that.loadQuotes();  
      } catch(ex) {
        console.error("Delete quote FAILED:", ex);
      }
    };

    this.renderChildViews();
  }
});