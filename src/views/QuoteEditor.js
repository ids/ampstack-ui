import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import './QuoteEditor.css';
import HTML_TEMPLATE from './QuoteEditor.html?raw';

export const QuoteEditorView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),

  initialize: function() {
      console.info("init quote editor");
  },

  render: function() {
    console.info("quote editor render");
    this.$el.html(this.template({}));
  }
});