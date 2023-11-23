import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import './WelcomePage.css';
import HTML_TEMPLATE from './WelcomePage.html?raw'

export const WelcomePageView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  user: undefined,

  showWelcomeMessage: function() {
    $("#welcomeMessagePanel").fadeIn();
  },
  render: function() {
    this.$el.html(this.template({
      currentUser: this.user
    }));
  }
});