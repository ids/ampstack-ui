import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import './LoginPage.css';
import HTML_TEMPLATE from './LoginPage.html?raw';

export const LoginPageView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),

  initialize: function() {
      console.log("init login page");
      console.log(this.$el);
  },

  render: function() {
    console.log("login page render");
    console.log(this.$el.attr('id'));
    this.$el.html(this.template({}));
  }
});