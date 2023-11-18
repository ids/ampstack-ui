import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import { Hub } from 'aws-amplify/utils';
import { signIn, signInWithRedirect, signOut, getCurrentUser } from 'aws-amplify/auth';
import { UserController } from '../controllers/User.mjs';

import './Header.css';
import HTML_TEMPLATE from './Header.html?raw';

export const HeaderView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  user: undefined,
  userController: new UserController(),
  
  events: {
    "click #signInButton":          "signInButtonHandler",
    "click #profileLink":           "profileLinkHandler",
    "click #signOutLink":           "signOutLinkHandler",

  },

  signInCallback: undefined,
  signOutCallback: undefined,

  profileLinkHandler: function() {
    alert("not yet implemented");
  },

  signOutLinkHandler: function() {
    if(this.signOutCallback) {
      this.signOutCallback();
    }
  },

  signInButtonHandler: function() {
    if(this.signInCallback) {
      this.signInCallback();
    }
  },

  initialize: function() {
      console.log("init header");
      console.log(this.$el);
  },

  render: function() {
    var that = this;

    console.log("header render");

    this.$el.html(this.template({
      currentUser: that.user,
      providerTag: that.user ? that.userController.getProviderTag(that.user) : undefined
    }));
  }
});