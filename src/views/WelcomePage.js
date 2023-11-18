import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import './WelcomePage.css';
import HTML_TEMPLATE from './WelcomePage.html?raw'

export const WelcomePageView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  user: undefined,

  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  },

  initialize: function() {
      console.log("init welcome");
  },

  render: function() {
    console.log("welcome page render");

    this.$el.html(this.template({
      currentUser: this.user
    }));
  }
});