import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import { Hub } from 'aws-amplify/utils';
import { signIn, signInWithRedirect, signOut, getCurrentUser } from 'aws-amplify/auth';

import './Header.css';
import HTML_TEMPLATE from './Header.html?raw';

export const HeaderView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  
  events: {
    "click .signin-button":          "onSignInHandler"
  },

  signInCallback: undefined,

  onSignInHandler: function() {
    if(this.signInCallback) {
      this.signInCallback();
    }
  },

  initialize: function() {
      console.log("init header");
      console.log(this.$el);
  },

  render: function() {
    console.log("header render");
    console.log(this.$el.attr('id'));
    this.$el.html(this.template({}));
  }
});