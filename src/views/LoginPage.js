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
    console.info("init login page");
  },

  signInButtonClickHandler: function(event) {
    console.debug("sign in button clicked");
    this.signInCompleteCallback?.({ attributes: { email: "daffy@superduck.com", username: "daffy0001" } });
  },

  signUpButtonClickHandler: function(event) {
    alert("not yet implemented");
  },

  signInWithGoogleButtonClickHandler: function(event) {
    this.signInWithGoogleCallback?.();
  },

  signInWithAmazonButtonClickHandler: function(event) {
    this.signInWithAmazonCallback?.();
  },

  render: function() {
    console.info("login page render");
    this.$el.html(this.template({}));
  }
});