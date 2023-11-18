import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import './LoginPage.css';
import HTML_TEMPLATE from './LoginPage.html?raw';

export const LoginPageView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  signInCompleteCallback: undefined,
  signInWithGoogleCallback: undefined,
  signInWithAmazonCallback: undefined,

  events: {
    "click #signInButton":                    "signInButtonClickHandler",
    "click #signUpButton":                    "signUpButtonClickHandler",
    "click #signInWithGoogleButton":          "signInWithGoogleButtonClickHandler",
    "click #signInWithAmazonButton":          "signInWithAmazonButtonClickHandler",
  },

  initialize: function() {
      console.log("init login page");
      console.log(this.$el);
  },

  signInButtonClickHandler: function(event) {
    console.debug("sign in button clicked");
    if(this.signInCompleteCallback) {
      this.signInCompleteCallback({ attributes: { email: "daffy@superduck.com", username: "daffy0001" } });
    }
  },

  signUpButtonClickHandler: function(event) {
    alert("not yet implemented");
  },

  signInWithGoogleButtonClickHandler: function(event) {
    if(this.signInWithGoogleCallback) {
      this.signInWithGoogleCallback();
    }
  },

  signInWithAmazonButtonClickHandler: function(event) {
    if(this.signInWithAmazonCallback) {
      this.signInWithAmazonCallback();
    }
  },

  render: function() {
    console.log("login page render");
    console.log(this.$el.attr('id'));
    this.$el.html(this.template({}));
  }
});