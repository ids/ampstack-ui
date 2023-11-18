import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import './WelcomePage.css';
import HTML_TEMPLATE from './WelcomePage.html?raw'

export const WelcomePageView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),

  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  },

  initialize: function() {
//    this.listenTo(this.model, "change", this.render);
      console.log("init welcome");
      console.log(this.$el);
  },

  render: function() {
    console.log("welcome page render");
    console.log(this.$el.attr('id'));

    this.$el.html(this.template({
      javascriptLogo: '/javascript.svg',
      viteLogo: '/vite.svg'
    }));
  }
});