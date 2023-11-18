import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import { get, post, del } from "aws-amplify/api";

import { QuoteViewerView } from './QuoteViewer';
import { QuoteController } from '../controllers/Quote';

import './WorkspacePage.css';
import HTML_TEMPLATE from './WorkspacePage.html?raw';

export const WorkspacePageView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  quotes: [],
  quoteController: QuoteController(get, post, del),

  initialize: function() {
      console.log("init workspace");
      console.log(this.$el);
  },

  loadQuotes: function() {
    console.info("loading quotes from controller");
    this.quoteController.loadAllQuotes().then((allQuotes) => {
      this.quotes = allQuotes;

      console.debug("fetch quotes complete:");
      console.debug(this.quotes);

      this.renderChildViews();
    }).catch((ex) => {
      console.error("ERROR loading quotes:");
      console.error(ex);
    });
  },

  renderChildViews: function() {
    this.quoteViewer = new QuoteViewerView({ el: "#quoteViewer"});
    this.quoteViewer.quotes = this.quotes;
    this.quoteViewer.render();
  },

  render: function() {
    console.log("workspace page render");
    console.log(this.$el.attr('id'));
    this.$el.html(this.template({}));

    this.renderChildViews();
  }
});