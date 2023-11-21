import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import './Footer.css';
import HTML_TEMPLATE from './Footer.html?raw';

export const FooterView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),

  initialize: function() {
      console.info("init footer");
  },

  render: function() {
    console.info("footer render");
    this.$el.html(this.template({}));
  }
});