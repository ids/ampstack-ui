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

  loadQuotes: function() {
    this.quoteController.loadAllQuotes().then((allQuotes) => {
      this.quotes = allQuotes;
      this.renderChildViews();
    }).catch((ex) => {
      console.error("ERROR loading quotes:");
      console.error(ex);
    });
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
    this.quoteEditor.upsertQuoteCallback = (quote) => {
      this.quoteController.upsertQuote(quote).then((savedQuote) => {
        console.info(`Saved quote: ${savedQuote.quoteId}`);
        console.debug(savedQuote);
        that.quoteEditor.clearAddQuoteForm();
        that.loadQuotes();
      }).catch((ex) => {
        console.error("ERROR adding quote:");
        console.error(ex);
      });  
    };

    this.quoteEditor.deleteQuoteCallback = (quoteId) => {
      this.quoteController.deleteQuote(quoteId).then((resp) => {
        console.info(`Deleted quote: ${quoteId}`);
        console.debug(resp);
        that.loadQuotes();
      }).catch((ex) => {
        console.error("ERROR deleting quote:");
        console.error(ex);
      });
    };

    this.renderChildViews();
  }
});