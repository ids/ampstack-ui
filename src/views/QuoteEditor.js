import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

import './QuoteEditor.css';
import HTML_TEMPLATE from './QuoteEditor.html?raw';

import { QuoteController } from '../controllers/Quote';

const ADD_QUOTE_BUTTON_TEXT = "Add Quote";
const ADD_QUOTE_BUTTON_TEXT_CONFIRM = "Confirm";
const EDIT_QUOTE_BUTTON_TEXT = "Update Quote";
const ALERT_DELAY = 5000;

export const QuoteEditorView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  quotes: [],
  user: undefined,
  quoteController: new QuoteController(),
  upsertQuoteCallback: undefined,
  deleteQuoteCallback: undefined,

  events: {
    "click #quoteAddButton":                          "addEditQuoteHandler",
    "click .QuoteEditor-list-edit-button":            "editQuoteHandler",
    "click #quoteCancelEditButton":                   "cancelEditQuoteHandler",
    "click .QuoteEditor-list-delete-button":          "deleteQuoteHandler"
  },

  initialize: function() {
      console.info("init quote editor");
  },

  clearAddQuoteForm: function() {
    $("#quoteAddButton").html(ADD_QUOTE_BUTTON_TEXT);
    $("#quoteAddButton").removeClass("btn-warning");
    $("#quoteAddButton").addClass("btn-primary");
    $("#quoteAddButton").attr('data-quote-id', '');
    $("#quoteCancelEditButton").hide();
    $("#quoteEditorTextField").val(""); 
    $("#quoteEditorAuthorField").val("");
    $("#quoteEditorTextField").trigger('focus'); 
  },

  validateQuoteForm: function() {
    if($("#quoteEditorTextField").val() === "") {
      $("#quoteTextBlankAlert").fadeIn();
      setTimeout(() => {
        $("#quoteTextBlankAlert").fadeOut()
      }, ALERT_DELAY);
      return false;
    }
    if($("#quoteEditorAuthorField").val() === "" && $("#quoteAddButton").html() === ADD_QUOTE_BUTTON_TEXT) {
      $("#quoteAuthorBlankAlert").fadeIn();
      setTimeout(() => {
        $("#quoteAuthorBlankAlert").fadeOut()
      }, ALERT_DELAY);
      $("#quoteAddButton").html(ADD_QUOTE_BUTTON_TEXT_CONFIRM);
      $("#quoteAddButton").addClass("btn-warning");
      return false;
    }
    return true;
  },

  addEditQuoteHandler: function(event) {
    var that = this;
    let quote = undefined;

    console.log("add/edit quote");
    console.log(event);

    if(this.validateQuoteForm()) {

      const quoteId = $("#quoteAddButton").attr('data-quote-id') === undefined ? '' : $("#quoteAddButton").attr('data-quote-id');

      if(quoteId !== '') {
        console.info(`Editing existing quote: ${quoteId}`);
        quote = this.quotes.filter(function (existingQuote) {
          return existingQuote.quoteId === quoteId;
        })[0];
      } else {
        quote = {
          quoteId: crypto.randomUUID(),
        };
        console.info(`Adding new quote: ${quote.quoteId}`);
      }
      quote.text = $("#quoteEditorTextField").val();
      quote.author = $("#quoteEditorAuthorField").val();
      quote.submittedBy = this.user.username;
      quote.submittedDate = new Date();
  
      this.upsertQuoteCallback(quote);
    }
  },

  cancelEditQuoteHandler: function(event) {
    this.clearAddQuoteForm();
  },

  editQuoteHandler: function (event) {
    console.log("edit quote");
    console.log(event);

    const quoteId = $(event.target).attr('data-quote-id');
    if(quoteId) {
      console.debug(`attempting to edit ${quoteId}`);
      const quote = this.quotes.filter(function (existingQuote) {
        return existingQuote.quoteId === quoteId;
      })[0];
      console.log(quote);
      $("#quoteAddButton").html(EDIT_QUOTE_BUTTON_TEXT);
      $("#quoteCancelEditButton").fadeIn();
      $("#quoteAddButton").attr('data-quote-id', quoteId);
      $("#quoteEditorTextField").val(quote.text);
      $("#quoteEditorAuthorField").val(quote.author);          
    }
  },

  deleteQuoteHandler: function (event) {
    const quoteId = $(event.target).attr('data-quote-id');
    if(quoteId) {
      console.debug(`attempting to delete quote: ${quoteId}`);
      if(this.deleteQuoteCallback) {
        this.deleteQuoteCallback(quoteId);
      }  
    } else {
      console.error("can't find the quoteId attribute");
    }

  },

  setFocus: function() {
    $("#quoteEditorTextField").trigger('focus');
  },

  render: function() {
    console.info("quote editor render");

    if(this.user) {
      const markdown = (text) => {
        return DOMPurify.sanitize(marked.parse(text));
      }
      this.$el.html(this.template({
        quotes: this.quotes,
        user: this.user,
        markdown: markdown
      }));  
    }
  }
});