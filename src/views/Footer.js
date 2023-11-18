import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import './Footer.css';
import HTML_TEMPLATE from './Footer.html?raw';

export const FooterView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),

  initialize: function() {
      console.log("init footer");
      console.log(this.$el);
  },

  render: function() {
    console.log("footer render");
    console.log(this.$el.attr('id'));
    this.$el.html(this.template({}));
  }
});